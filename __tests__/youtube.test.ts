import {
    isYouTubeVideoUrl,
    isYouTubeUrl,
    getYouTubeVideoId,
    isYouTubeChannelUrl,
    getYouTubeChannelId,
} from '../youtube'

/* eslint-disable no-secrets/no-secrets -- urls will often look like secrets */
const invalidUrls = [
    '',
    'this is not a valid video url',
    'https://studio.youtube.com/channel/UCV0kE6VObGM1hX9HgUJj2eA',
    'https://studio.youtube.com/video/dQw4w9WgXcQ/edit/basic',
    'https://youtu.be/',
    'https://youtu.be',
    'https://youtu.be/embed/lskdjf',
    'https://youtu.be/playlist/lkjsdfl',
    'https://www.youtu.be/dQw4w9WgXcQ',
    'https://www.youtube/dQw4w9WgXcQ',
    'https://www.youtu.b/dQw4w9WgXcQ',
    '//youtu.be/dQw4w9WgXcQ',
    '/youtu.be/dQw4w9WgXcQ',
    'ftp://youtu.be/dQw4w9WgXcQ',
    'https://www.facebook.com/dQw4w9WgXcQ',
    'https://google.com/dQw4w9WgXcQ',
    'https://youtu.b/dQw4w9WgXcQ',
    'https://www.youtu.be/dQw4w9WgXcQ',
    'https://youtube/dQw4w9WgXcQ',
    'https://facebook.com/watch?v=dQw4w9WgXcQ',
]

type ValidUrl = [
    string,
    {
        type: 'video' | 'channel' | 'playlist' | 'homepage' | 'other'
        id?: string
        timestamp?: string
        playlist?: string
        subscribe?: boolean
    }
]

const validUrls: ValidUrl[] = [
    [
        'https://youtube.com',
        {
            type: 'homepage',
        },
    ],
    [
        'https://youtube.com/',
        {
            type: 'homepage',
        },
    ],
    [
        'https://youtu.be/dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'https://youtube.com/watch?v=dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'http://youtu.be/dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'http://youtube.com/watch?v=dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'https://youtu.be/sXQxhojSdZM',
        {
            type: 'video',
            id: 'sXQxhojSdZM',
        },
    ],
    [
        'https://youtu.be/dQw4w9WgXcQ?t=1',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '1',
        },
    ],
    [
        'https://youtu.be/dQw4w9WgXcQ?t=1',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '81',
        },
    ],
    [
        'https://www.youtube.com/watch?v=sXQxhojSdZM',
        {
            type: 'video',
            id: 'sXQxhojSdZM',
        },
    ],
    [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ?t=1',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '1',
        },
    ],
    [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '1',
        },
    ],
    [
        'https://www.youtube.com/watch?v=sXQxhojSdZM&t=81',
        {
            type: 'video',
            id: 'sXQxhojSdZM',
            timestamp: '81',
        },
    ],
    [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1&feature=youtu.be',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '1',
        },
    ],
    [
        'https://www.youtube.com/watch?v=sXQxhojSdZM&t=81&feature=youtu.be',
        {
            type: 'video',
            id: 'sXQxhojSdZM',
            timestamp: '81',
        },
    ],
    [
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1&feature=youtu.be',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '1',
        },
    ],
    [
        'https://www.youtube.com/watch?v=3st2Hk8G-QI&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA',
        {
            type: 'video',
            id: '3st2Hk8G-QI',
            playlist: 'PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA',
        },
    ],
    [
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
        },
    ],
    [
        'https://www.youtube.com/embed/dQw4w9WgXcQ?t=314',
        {
            type: 'video',
            id: 'dQw4w9WgXcQ',
            timestamp: '314',
        },
    ],
    [
        'https://www.youtube.com/playlist?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA',
        {
            type: 'playlist',
            id: 'PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA',
        },
    ],
    [
        'https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw',
        {
            type: 'channel',
            id: 'UCuAXFkgsw1L7xaCfnd5JJOw',
        },
    ],
    [
        'youtube.com/user/channel_name',
        {
            type: 'channel',
            id: 'channel_name',
        },
    ],
    [
        'youtube.com/channel/UCUZHFZ9jIKrLroW8LcyJEQQ',
        {
            type: 'channel',
            id: 'UCUZHFZ9jIKrLroW8LcyJEQQ',
        },
    ],
    [
        'youtube.com/c/YouTubeCreators',
        {
            type: 'channel',
            id: 'YouTubeCreators',
        },
    ],
    [
        'youtube.com/YouTubeCreators',
        {
            type: 'channel',
            id: 'YouTubeCreators',
        },
    ],
    [
        'youtube.com/user/channel_name',
        {
            type: 'channel',
            id: 'channel_name',
            subscribe: true,
        },
    ],
    [
        'youtube.com/channel/UCUZHFZ9jIKrLroW8LcyJEQQ',
        {
            type: 'channel',
            id: 'UCUZHFZ9jIKrLroW8LcyJEQQ',
            subscribe: true,
        },
    ],
    [
        'youtube.com/c/YouTubeCreators',
        {
            type: 'channel',
            id: 'YouTubeCreators',
            subscribe: true,
        },
    ],
    [
        'youtube.com/YouTubeCreators',
        {
            type: 'channel',
            id: 'YouTubeCreators',
            subscribe: true,
        },
    ],
]

/* eslint-enable no-secrets/no-secrets -- urls will often look like secrets */

describe('should detect valid YouTube urls', () => {
    test.each(validUrls)('valid url "%s" returns true', (url) => {
        expect(isYouTubeUrl(url)).toBe(true)
    })
    test.each(invalidUrls)('invalid url "%s" returns false', (url) => {
        expect(isYouTubeUrl(url)).toBe(false)
    })
})

describe('Should detect valid YouTube video urls', () => {
    test.each(invalidUrls)('invalid youtube url "%s" returns false', (url) => {
        expect(isYouTubeVideoUrl(url)).toBe(false)
    })

    test.each(validUrls.filter((url) => url[1].type !== 'video'))(
        'youtube url "%s" returns false because it\'s not a video',
        (url) => {
            expect(isYouTubeVideoUrl(url)).toBe(false)
        }
    )

    test.each(validUrls.filter((url) => url[1].type === 'video'))(
        'youtube video url "%s" returns true',
        (url) => {
            expect(isYouTubeVideoUrl(url)).toBe(true)
        }
    )
})

describe('gets YouTube video ids', () => {
    test.each(invalidUrls)('invalid youtube url "%s" returns empty string', (url) => {
        expect(getYouTubeVideoId(url)).toBe('')
    })

    test.each(validUrls.filter((url) => url[1].type !== 'video'))(
        'youtube url "%s" returns empty string because it\'s not a video',
        (url) => {
            expect(getYouTubeVideoId(url)).toBe('')
        }
    )

    test.each(validUrls.filter((url) => url[1].type === 'video'))(
        'youtube video url "%s" returns correct id',
        (url, attributes) => {
            expect(getYouTubeVideoId(url)).toBe(attributes.id)
        }
    )
})

describe('test if valid channel urls', () => {
    test.each(invalidUrls)('invalid youtube url "%s" returns false', (url) => {
        expect(isYouTubeChannelUrl(url)).toBe(false)
    })

    test.each(validUrls.filter((url) => url[1].type !== 'channel'))(
        'youtube url "%s" returns false because it\'s not a channel',
        (url) => {
            expect(isYouTubeChannelUrl(url)).toBe(false)
        }
    )

    test.each(validUrls.filter((url) => url[1].type === 'channel'))(
        'youtube channel url "%s" returns true',
        (url) => {
            expect(isYouTubeChannelUrl(url)).toBe(true)
        }
    )
})

describe('get YT channel id', () => {
    test.each(invalidUrls)('invalid youtube url "%s" returns empty string', (url) => {
        expect(getYouTubeChannelId(url)).toBe('')
    })

    test.each(validUrls.filter((url) => url[1].type !== 'channel'))(
        'youtube url "%s" returns empty string because it\'s not a channel',
        (url) => {
            expect(getYouTubeChannelId(url)).toBe('')
        }
    )

    test.each(validUrls.filter((url) => url[1].type === 'channel'))(
        'youtube channel url "%s" returns correct id',
        (url, attributes) => {
            expect(getYouTubeChannelId(url)).toBe(attributes.id)
        }
    )
})

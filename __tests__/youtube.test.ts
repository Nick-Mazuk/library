/* eslint-disable no-secrets/no-secrets -- urls will often look like secrets */
import {
    isYouTubeVideoUrl,
    isYouTubeUrl,
    getYouTubeVideoId,
    isYouTubeChannelUrl,
    getYouTubeChannelId,
} from '../youtube'

// eslint-disable-next-line max-lines-per-function -- but still readable
describe('should detect valid YouTube urls', () => {
    test('videos should return true', () => {
        expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ?t=1')).toBe(true)
        expect(isYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1')).toBe(true)
        expect(
            isYouTubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1&feature=youtu.be')
        ).toBe(true)
        expect(
            isYouTubeUrl(
                'https://www.youtube.com/watch?v=3st2Hk8G-QI&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe(true)
    })
    test('all YouTube domains should return true', () => {
        expect(isYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeUrl('https://www.youtube.com/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeUrl('https://youtube.com/dQw4w9WgXcQ')).toBe(true)
    })
    test('http should also be supported', () => {
        expect(isYouTubeUrl('http://youtu.be/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeUrl('http://www.youtube.com/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeUrl('http://youtube.com/dQw4w9WgXcQ')).toBe(true)
    })
    test('playlists should return true', () => {
        expect(
            isYouTubeUrl('https://www.youtube.com/playlist?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA')
        ).toBe(true)
    })
    test('embeds should return true', () => {
        expect(isYouTubeUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(true)
    })
    test('channels should return true', () => {
        expect(isYouTubeUrl('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw')).toBe(true)
    })
    test('YouTube studio should return false false', () => {
        expect(isYouTubeUrl('https://studio.youtube.com/channel/UCV0kE6VObGM1hX9HgUJj2eA')).toBe(
            false
        )
        expect(isYouTubeUrl('https://studio.youtube.com/video/dQw4w9WgXcQ/edit/basic')).toBe(false)
    })
    test('expect strings in the "share video" without id to return false', () => {
        expect(isYouTubeUrl('https://youtu.be/')).toBe(false)
        expect(isYouTubeUrl('https://youtu.be')).toBe(false)
    })
    test('expect strings in the "share video" with extra paths should return false', () => {
        expect(isYouTubeUrl('https://youtu.be/embed/lskdjf')).toBe(false)
        expect(isYouTubeUrl('https://youtu.be/playlist/lkjsdfl')).toBe(false)
    })
    test('variations on YouTube domains should be false', () => {
        expect(isYouTubeUrl('https://www.youtu.be/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeUrl('https://www.youtube/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeUrl('https://www.youtu.b/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeUrl('//youtu.be/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeUrl('/youtu.be/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeUrl('ftp://youtu.be/dQw4w9WgXcQ')).toBe(false)
    })
    test('other domains should be false', () => {
        expect(isYouTubeUrl('https://www.facebook.com/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeUrl('https://google.com/dQw4w9WgXcQ')).toBe(false)
    })
})

// eslint-disable-next-line max-lines-per-function -- still readable
describe('Should detect valid YouTube video urls', () => {
    test('base case: empty string should return false', () => {
        expect(isYouTubeVideoUrl('')).toBe(false)
    })
    test('base case: youtube homepage returns false', () => {
        expect(isYouTubeVideoUrl('https://youtube.com')).toBe(false)
    })
    test('expect strings in the "share video" format to be true', () => {
        expect(isYouTubeVideoUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeVideoUrl('https://youtu.be/sXQxhojSdZM')).toBe(true)
    })
    test('expect strings in the "share video" with time string format to be true', () => {
        expect(isYouTubeVideoUrl('https://youtu.be/dQw4w9WgXcQ?t=1')).toBe(true)
        expect(isYouTubeVideoUrl('https://youtu.be/dQw4w9WgXcQ?t=81')).toBe(true)
    })
    test('expect strings in the "url bar" format to be true', () => {
        expect(isYouTubeVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeVideoUrl('https://www.youtube.com/watch?v=sXQxhojSdZM')).toBe(true)
    })
    test('expect strings in the "url bar" with time string format to be true', () => {
        expect(isYouTubeVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1')).toBe(true)
        expect(isYouTubeVideoUrl('https://www.youtube.com/watch?v=sXQxhojSdZM&t=81')).toBe(true)
    })
    test('expect strings in the "url bar" with "feature" parameter to be true', () => {
        expect(
            isYouTubeVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1&feature=youtu.be')
        ).toBe(true)
        expect(
            isYouTubeVideoUrl('https://www.youtube.com/watch?v=sXQxhojSdZM&t=81&feature=youtu.be')
        ).toBe(true)
    })
    test('expect videos as part of a playlist to be true', () => {
        expect(
            isYouTubeVideoUrl(
                'https://www.youtube.com/watch?v=3st2Hk8G-QI&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe(true)
    })
    test('expect embeds to be true', () => {
        expect(isYouTubeVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ?t=81')).toBe(true)
    })
    test('expect both http to also be true', () => {
        expect(isYouTubeVideoUrl('http://youtu.be/dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeVideoUrl('http://youtu.be/dQw4w9WgXcQ?t=1')).toBe(true)
        expect(isYouTubeVideoUrl('http://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true)
        expect(isYouTubeVideoUrl('http://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1')).toBe(true)
        expect(
            isYouTubeVideoUrl('http://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1&feature=youtu.be')
        ).toBe(true)
        expect(
            isYouTubeVideoUrl(
                'http://www.youtube.com/watch?v=3st2Hk8G-QI&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe(true)
    })
    test('expect playlist urls to be false', () => {
        expect(
            isYouTubeVideoUrl(
                'https://www.youtube.com/playlist?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe(false)
    })
    test('expect channel urls to be false', () => {
        expect(isYouTubeVideoUrl('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw')).toBe(
            false
        )
    })
    test('expect other domains with the same format to be false', () => {
        expect(isYouTubeVideoUrl('https://youtu.b/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeVideoUrl('https://www.youtu.be/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeVideoUrl('https://youtube/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeVideoUrl('https://facebook.com/watch?v=dQw4w9WgXcQ')).toBe(false)
    })
})

// eslint-disable-next-line max-lines-per-function -- still readable
describe('gets YouTube video ids', () => {
    test('base case: if empty string return empty string', () => {
        expect(getYouTubeVideoId('')).toBe('')
    })
    test('base case: if not a valid video url, return empty string', () => {
        expect(getYouTubeVideoId('this is not a valid video url')).toBe('')
        expect(getYouTubeVideoId('https://youtube.com')).toBe('')
    })
    test('for youtu.be urls', () => {
        expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
        expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ__23')).toBe('dQw4w9WgXcQ__23')
        expect(getYouTubeVideoId('https://youtu.be/w4w9WgXcQ__23')).toBe('w4w9WgXcQ__23')
    })
    test('for youtu.be urls with other parameters', () => {
        expect(getYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=1')).toBe('dQw4w9WgXcQ')
        expect(
            getYouTubeVideoId(
                'https://youtu.be/dQw4w9WgXcQ__23?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe('dQw4w9WgXcQ__23')
        expect(
            getYouTubeVideoId(
                'https://youtu.be/w4w9WgXcQ__23?t=1&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe('w4w9WgXcQ__23')
    })
    test('for youtube.com urls', () => {
        expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
        expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ__23')).toBe(
            'dQw4w9WgXcQ__23'
        )
        expect(getYouTubeVideoId('https://www.youtube.com/watch?v=w4w9WgXcQ__23')).toBe(
            'w4w9WgXcQ__23'
        )
    })
    test('for youtube.com urls with parameters', () => {
        expect(getYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1')).toBe(
            'dQw4w9WgXcQ'
        )
        expect(
            getYouTubeVideoId(
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ__23&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe('dQw4w9WgXcQ__23')
        expect(
            getYouTubeVideoId(
                'https://www.youtube.com/watch?v=w4w9WgXcQ__23&t=1&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe('w4w9WgXcQ__23')
    })
    test("for youtube.com urls where video isn't the first parameter", () => {
        expect(getYouTubeVideoId('https://www.youtube.com/watch?t=1&v=dQw4w9WgXcQ')).toBe(
            'dQw4w9WgXcQ'
        )
        expect(
            getYouTubeVideoId(
                'https://www.youtube.com/watch?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA&v=dQw4w9WgXcQ__23'
            )
        ).toBe('dQw4w9WgXcQ__23')
        expect(
            getYouTubeVideoId(
                'https://www.youtube.com/watch?t=1&list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA&v=w4w9WgXcQ__23'
            )
        ).toBe('w4w9WgXcQ__23')
    })
    test('for embeds', () => {
        expect(getYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ')
    })
    test('for embeds with parameters', () => {
        expect(getYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ?t=81')).toBe(
            'dQw4w9WgXcQ'
        )
    })
})

describe('test if valid channel urls', () => {
    test('base case: if empty string return false', () => {
        expect(isYouTubeChannelUrl('')).toBe(false)
    })
    test('base case: if not a valid url, return empty string', () => {
        expect(isYouTubeChannelUrl('this is not a valid url')).toBe(false)
    })
    test("base case: if there isn't a path", () => {
        expect(isYouTubeChannelUrl('https://youtube.com')).toBe(false)
        expect(isYouTubeChannelUrl('https://youtube.com/')).toBe(false)
    })
    test("if it's a valid video url, return false", () => {
        expect(isYouTubeChannelUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(false)
        expect(isYouTubeChannelUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(false)
    })
    test("if it's a valid playlist url, return false", () => {
        expect(
            isYouTubeChannelUrl(
                'https://www.youtube.com/playlist?list=PLbI7dEs56ocIC2vBf1HYyi6aHi0y4VneA'
            )
        ).toBe(false)
    })
    test('if legacy user url, return true', () => {
        expect(isYouTubeChannelUrl('youtube.com/user/channel_name')).toBe(true)
    })
    test('if id-based url, return true', () => {
        expect(isYouTubeChannelUrl('youtube.com/channel/UCUZHFZ9jIKrLroW8LcyJEQQ')).toBe(true)
    })
    test('if custom url, return true', () => {
        expect(isYouTubeChannelUrl('youtube.com/c/YouTubeCreators')).toBe(true)
    })
    test('if shortened url, return true', () => {
        expect(isYouTubeChannelUrl('youtube.com/YouTubeCreators')).toBe(true)
    })
    test('if subscribe parameter is present, return true', () => {
        expect(isYouTubeChannelUrl('youtube.com/user/channel_name?subscribe=1')).toBe(true)
        expect(
            isYouTubeChannelUrl('youtube.com/channel/UCUZHFZ9jIKrLroW8LcyJEQQ?subscribe=1')
        ).toBe(true)
        expect(isYouTubeChannelUrl('youtube.com/c/YouTubeCreators?subscribe=1')).toBe(true)
        expect(isYouTubeChannelUrl('youtube.com/YouTubeCreators?subscribe=1')).toBe(true)
    })
})

describe('get YT channel id', () => {
    test('base case: if empty string return false', () => {
        expect(getYouTubeChannelId('')).toBe('')
    })
    test('base case: if not a valid video url, return empty string', () => {
        expect(getYouTubeChannelId('this is not a valid video url')).toBe('')
    })
    test('legacy url', () => {
        expect(getYouTubeChannelId('youtube.com/user/channel_name')).toBe('channel_name')
        expect(getYouTubeChannelId('youtube.com/user/channel_name?subscribe=1')).toBe(
            'channel_name'
        )
    })
    test('id-based url', () => {
        expect(getYouTubeChannelId('youtube.com/channel/UCUZHFZ9jIKrLroW8LcyJEQQ')).toBe(
            'UCUZHFZ9jIKrLroW8LcyJEQQ'
        )
        expect(
            getYouTubeChannelId('youtube.com/channel/UCUZHFZ9jIKrLroW8LcyJEQQ?subscribe=1')
        ).toBe('UCUZHFZ9jIKrLroW8LcyJEQQ')
    })
    test('custom url', () => {
        expect(getYouTubeChannelId('youtube.com/c/YouTubeCreators')).toBe('YouTubeCreators')
        expect(getYouTubeChannelId('youtube.com/c/YouTubeCreators?subscribe=1')).toBe(
            'YouTubeCreators'
        )
    })
    test('Shortened url', () => {
        expect(getYouTubeChannelId('youtube.com/YouTubeCreators')).toBe('YouTubeCreators')
        expect(getYouTubeChannelId('youtube.com/YouTubeCreators?subscribe=1')).toBe(
            'YouTubeCreators'
        )
    })
})

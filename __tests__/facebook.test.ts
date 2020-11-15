import {
    createFacebookShareLink,
    isFacebookUrl,
    isFacebookPageUrl,
    isFacebookGroupUrl,
} from '../facebook'

describe('creates share url', () => {
    const urls = ['https://google.com', 'https://example.com', 'https://material.io']
    test.each(urls)('"%s" is shared correctly', (url) => {
        const sharedUrl = createFacebookShareLink(url)
        expect(sharedUrl).toMatch(`https://www.facebook.com/sharer/sharer.php`)
        expect(sharedUrl).toMatch(`u=${url}`)
    })

    test.each(urls)('share url can redirect back to "%s"', (url) => {
        const sharedUrl = createFacebookShareLink('https://sharethisthing.com', {
            redirectTo: url,
        })
        expect(sharedUrl).toMatch(`redirect_uri=${url}`)
    })

    const displayValues: ('popup' | 'page')[] = ['popup', 'page']
    test.each(displayValues)("share url can specify how it's displayed", (display) => {
        const sharedUrl = createFacebookShareLink('https://sharethisthing.com', {
            display: display,
        })
        expect(sharedUrl).toMatch(`display=${display}`)
    })
})

const invalidUrls = ['', 'https://google.com', 'facebook.co', 'https://facebook.co']

type ValidUrl = [
    string,
    {
        type: 'page' | 'group' | 'homepage' | 'other'
        id?: string
    }
]

const validUrls: ValidUrl[] = [
    [
        'https://www.facebook.com',
        {
            type: 'homepage',
        },
    ],
    [
        'https://facebook.com',
        {
            type: 'homepage',
        },
    ],
    [
        'http://www.facebook.com',
        {
            type: 'homepage',
        },
    ],
    [
        'http://facebook.com',
        {
            type: 'homepage',
        },
    ],
    [
        'https://www.facebook.com/facebook',
        {
            type: 'page',
            id: 'facebook',
        },
    ],
    [
        'https://www.facebook.com/facebook/',
        {
            type: 'page',
            id: 'facebook',
        },
    ],
    [
        'https://www.facebook.com/groups/743327632675687/',
        {
            type: 'group',
            id: '743327632675687',
        },
    ],
    [
        'https://www.facebook.com/groups/feed/',
        {
            type: 'other',
        },
    ],
    [
        'https://www.facebook.com/groups/feed',
        {
            type: 'other',
        },
    ],
]

describe('detects valid Facebook urls', () => {
    test.each(invalidUrls)('"%s" is marked as invalid', (url) => {
        expect(isFacebookUrl(url)).toBe(false)
    })

    test.each(validUrls)('"%s" is marked as valid', (url) => {
        expect(isFacebookUrl(url)).toBe(true)
    })
})

describe('detects valid Facebook profile/page urls', () => {
    test.each(invalidUrls)('invalid Facebook url "%s" return false', (url) => {
        expect(isFacebookPageUrl(url)).toBe(false)
    })

    test.each(validUrls.filter((url) => url[1].type !== 'page'))(
        'Facebook url "%s" is not a profile/page',
        (url) => {
            expect(isFacebookPageUrl(url)).toBe(false)
        }
    )

    test.each(validUrls.filter((url) => url[1].type === 'page'))(
        'Facebook url "%s" is a page/profile',
        (url) => {
            expect(isFacebookPageUrl(url)).toBe(true)
        }
    )
})

describe('detects valid Facebook group urls', () => {
    test.each(invalidUrls)('invalid Facebook url "%s" return false', (url) => {
        expect(isFacebookGroupUrl(url)).toBe(false)
    })

    test.each(validUrls.filter((url) => url[1].type !== 'group'))(
        'Facebook url "%s" is not a group',
        (url) => {
            expect(isFacebookGroupUrl(url)).toBe(false)
        }
    )

    test.each(validUrls.filter((url) => url[1].type === 'group'))(
        'Facebook url "%s" is a group',
        (url) => {
            expect(isFacebookGroupUrl(url)).toBe(true)
        }
    )
})

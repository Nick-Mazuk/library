import { createTwitterShareLink, isTwitterUrl } from '../twitter'

describe('creates share url', () => {
    const urls = ['https://google.com', 'https://example.com', 'https://material.io']
    test.each(urls)('"%s" is shared correctly', (url) => {
        const sharedUrl = createTwitterShareLink(url)
        expect(sharedUrl).toMatch(`http://twitter.com/intent/tweet`)
        expect(sharedUrl).toMatch(`url=${url}`)
    })

    const texts = ['hello world', 'this is some tweet']
    test.each(texts)('tweet has text "%s"', (text) => {
        const sharedUrl = createTwitterShareLink('https://example.com', { text: text })
        expect(sharedUrl).toMatch(`http://twitter.com/intent/tweet`)
        expect(sharedUrl).toMatch(`text=${text}`)
    })
})

const invalidUrls = [
    '',
    'this is not a valid video url',
    'https://youtu.be/lkjsdlkfj',
    'https://www.facebook.com/dQw4w9WgXcQ',
]

const validUrls = [
    'https://twitter.com',
    'https://twitter.com/',
    'https://twitter.com/explore',
    'https://twitter.com/search?q=hello&src=typed_query',
    'https://twitter.com/settings/account/personalization',
    'http://twitter.com',
    'http://twitter.com/',
    'http://twitter.com/explore',
    'http://twitter.com/search?q=hello&src=typed_query',
    'http://twitter.com/settings/account/personalization',
    'https://www.twitter.com',
    'https://www.twitter.com/',
    'https://www.twitter.com/explore',
    'https://www.twitter.com/search?q=hello&src=typed_query',
    'https://www.twitter.com/settings/account/personalization',
    'http://www.twitter.com',
    'http://www.twitter.com/',
    'http://www.twitter.com/explore',
    'http://www.twitter.com/search?q=hello&src=typed_query',
    'http://www.twitter.com/settings/account/personalization',
]

describe('detects valid twitter urls', () => {
    test.each(invalidUrls)('"%s" is marked as invalid', (url) => {
        expect(isTwitterUrl(url)).toBe(false)
    })
    test.each(validUrls)('"%s" is marked as valid', (url) => {
        expect(isTwitterUrl(url)).toBe(true)
    })
})

import { createTwitterShareLink } from '../twitter'

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

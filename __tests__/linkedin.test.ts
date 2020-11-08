import { createLinkedinShareLink } from '../linkedin'

describe('creates share url', () => {
    const urls = ['https://google.com', 'https://example.com', 'https://material.io']
    test.each(urls)('"%s" is shared correctly', (url) => {
        const sharedUrl = createLinkedinShareLink(url)
        expect(sharedUrl).toMatch(`https://www.linkedin.com/shareArticle`)
        expect(sharedUrl).toMatch(`url=${url}`)
    })
})

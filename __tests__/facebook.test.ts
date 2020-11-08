import { createFacebookShareLink } from '../facebook'

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
        expect(sharedUrl).toMatch(`https://www.facebook.com/sharer/sharer.php`)
        expect(sharedUrl).toMatch(`redirect_uri=${url}`)
    })

    const displayValues: ('popup' | 'page')[] = ['popup', 'page']
    test.each(displayValues)("share url can specify how it's displayed", (display) => {
        const sharedUrl = createFacebookShareLink('https://sharethisthing.com', {
            display: display,
        })
        expect(sharedUrl).toMatch(`https://www.facebook.com/sharer/sharer.php`)
        expect(sharedUrl).toMatch(`display=${display}`)
    })
})

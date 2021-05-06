import { appendQueryParameters, isParentPath } from '../url'

// eslint-disable-next-line max-lines-per-function -- tests are short
describe('appends the query parameters to the url', () => {
    const urlData: [string, [string, string][], string][] = [
        ['https://google.com', [], 'https://google.com'],
        ['http://localhost', [], 'http://localhost'],
        ['http://localhost', [['ensemble', '']], 'http://localhost'],
        [
            'http://localhost',
            [['ensemble', 'trombone choir']],
            'http://localhost?ensemble=trombone choir',
        ],
        [
            'http://localhost',
            [
                ['ensemble', 'trombone choir'],
                ['composer', 'John Williams'],
            ],
            'http://localhost?ensemble=trombone choir&composer=John Williams',
        ],
        [
            'http://localhost',
            [
                ['composer', 'John Williams'],
                ['ensemble', 'trombone choir'],
            ],
            'http://localhost?composer=John Williams&ensemble=trombone choir',
        ],
        [
            'http://localhost?ensemble=flute',
            [['ensemble', 'trombone choir']],
            'http://localhost?ensemble=trombone choir',
        ],
        [
            'http://localhost?ensemble=flute',
            [['composer', 'John Williams']],
            'http://localhost?ensemble=flute&composer=John Williams',
        ],
    ]

    test.each(urlData)(
        'url "%s" with parameters "%s" becomes "%s"',
        (baseUrl, queryParameters, output) => {
            expect(appendQueryParameters(baseUrl, queryParameters)).toBe(output)
        }
    )

    test('allow empty parameters in query', () => {
        expect(appendQueryParameters('https://example.com', [['query', '']], true)).toBe(
            'https://example.com?query='
        )
    })
    test('allow empty parameters in base url', () => {
        expect(appendQueryParameters('https://example.com?query=', [], true)).toBe(
            'https://example.com?query='
        )
    })
})

describe('returns true if the base path is a parent of the current path', () => {
    const urlData: [string, string, boolean][] = [
        ['/blog', '/blog/post-slug', true],
        ['/blog', '/blog/posts/post-slug', true],
        ['/blog/', '/blog/post-slug', true],
        ['/blog/', '/blog/posts/post-slug', true],
        ['/blog/posts', '/blog/posts/post-slug', true],
        ['/blog/posts/', '/blog/posts/post-slug', true],
        ['/blog?sort=popularity', '/blog/posts/post-slug', true],
        ['/blog/?sort=popularity', '/blog/posts/post-slug', true],
        ['/', '/home', false],
        ['/news', '/newsletter', false],
        ['/news/', '/newsletter', false],
        ['/newsletter/', '/news', false],
    ]
    test.each(urlData)('base path "%s" is the parent of "%s"', (basePath, currentPath, output) => {
        expect(isParentPath(basePath, currentPath)).toBe(output)
    })
})

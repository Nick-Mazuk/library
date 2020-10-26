import { sentenceCase, endWithPunctuation, formatNumber } from '../text-styling'

describe('Strings should end with punctuation', () => {
    test('Base case: empty strings should not get punctuation', () => {
        expect(endWithPunctuation('')).toBe('')
    })
    test('basic functionality', () => {
        expect(endWithPunctuation('Hello world')).toBe('Hello world.')
        expect(endWithPunctuation('Hello world?')).toBe('Hello world?')
        expect(endWithPunctuation('Hello world!')).toBe('Hello world!')
        expect(endWithPunctuation('Hello world:')).toBe('Hello world:.')
    })
    test('custom punctuation marks', () => {
        expect(endWithPunctuation('Hello world', '.')).toBe('Hello world.')
        expect(endWithPunctuation('Hello world?', '.')).toBe('Hello world?')
        expect(endWithPunctuation('Hello world!', '.')).toBe('Hello world!')
    
        expect(endWithPunctuation('Hello world', '?')).toBe('Hello world?')
        expect(endWithPunctuation('Hello world?', '?')).toBe('Hello world?')
        expect(endWithPunctuation('Hello world!', '?')).toBe('Hello world!')
    
        expect(endWithPunctuation('Hello world', '!')).toBe('Hello world!')
        expect(endWithPunctuation('Hello world?', '!')).toBe('Hello world?')
        expect(endWithPunctuation('Hello world!', '!')).toBe('Hello world!')
    })
    
    test('if the second parameter is multiple characters, ignore it', () => {
        expect(endWithPunctuation('Hello world', '!!')).toBe('Hello world.')
    })
})

describe('Formats a number with thousands separators', () => {
    test('Base case: empty strings should not change', () => {
        expect(formatNumber('')).toBe('')
    })

    test('strings already formatted should not change', () => {
        expect(formatNumber('100')).toBe('100')
        expect(formatNumber('1,000')).toBe('1,000')
        expect(formatNumber('1,000.0')).toBe('1,000.0')
    })

    test('add thousand separators', () => {
        expect(formatNumber('1000')).toBe('1,000')
        expect(formatNumber('10,0000,0')).toBe('1,000,000')
        expect(formatNumber('31415926535')).toBe('31,415,926,535')
        expect(formatNumber('123.123123123')).toBe('123.123123123')
    })

    test('remove unneeded leading zeros', () => {
        expect(formatNumber('000100')).toBe('100')
        expect(formatNumber('000100.')).toBe('100')
        expect(formatNumber('0,00100.0')).toBe('100.0')
    })
    test('zeros after the decimal should be kept', () => {
        expect(formatNumber('1.0')).toBe('1.0')
    })

    test('remove dangling periods', () => {
        expect(formatNumber('1.')).toBe('1')
        expect(formatNumber('211.')).toBe('211')
    })

    test('strings that aren\'t valid numbers throw error', () => {
        expect(() => { formatNumber('hello') }).toThrow()
        expect(() => { formatNumber('hello 12') }).toThrow()
        expect(() => { formatNumber('1 12') }).toThrow()
        expect(() => { formatNumber(' 12') }).toThrow()
        expect(() => { formatNumber('12 ') }).toThrow()
        expect(() => { formatNumber('12 .000') }).toThrow()
        expect(() => { formatNumber('3.1415.9') }).toThrow()
    })
})

describe('Sentence case: First word of every sentence is capitalized', () => {
    test('Base case: empty strings should not change', () => {
        expect(sentenceCase('')).toBe('')
    })

    test('The first word of a sentence should be capitalized', () => {
        expect(sentenceCase('first letter should be caps')).toBe('First letter should be caps')
        expect(sentenceCase('Hello World. hello World.')).toBe('Hello world. Hello world.')
        expect(sentenceCase("HOW ARE YOU? i'm OK.")).toBe("How are you? I'm ok.")
        expect(sentenceCase('Exclamation! wow!')).toBe('Exclamation! Wow!')
    })

    test('Words after the first word should be lowercase', () => {
        expect(sentenceCase('Hello World')).toBe('Hello world')
        expect(sentenceCase('Hello World. Hello World.')).toBe('Hello world. Hello world.')
        expect(sentenceCase("HOW ARE YOU? I'm OK.")).toBe("How are you? I'm ok.")
    })

    test('Text already properly capitalized should not change', () => {
        expect(sentenceCase('Exclamation! Wow!')).toBe('Exclamation! Wow!')
        expect(sentenceCase('Hello world. Hello world.')).toBe('Hello world. Hello world.')
    })

    test('Colons don\'t count as punctuation here', () => {
        expect(sentenceCase('Items after colons: Should be lowercase')).toBe(
            'Items after colons: should be lowercase'
        )
        expect(sentenceCase('Items after colons: should be lowercase')).toBe(
        'Items after colons: should be lowercase'
    )
    })
})

import { sentenceCase, endWithPunctuation, formatNumber } from './text-styling'

test('Strings should end with punctuation unless one is provided', () => {
    expect(endWithPunctuation('')).toBe('')
    expect(endWithPunctuation('Hello world')).toBe('Hello world.')
    expect(endWithPunctuation('Hello world?')).toBe('Hello world?')
    expect(endWithPunctuation('Hello world!')).toBe('Hello world!')

    expect(endWithPunctuation('Hello world', '.')).toBe('Hello world.')
    expect(endWithPunctuation('Hello world?', '.')).toBe('Hello world?')
    expect(endWithPunctuation('Hello world!', '.')).toBe('Hello world!')

    expect(endWithPunctuation('Hello world', '?')).toBe('Hello world?')
    expect(endWithPunctuation('Hello world?', '?')).toBe('Hello world?')
    expect(endWithPunctuation('Hello world!', '?')).toBe('Hello world!')

    expect(endWithPunctuation('Hello world', '!')).toBe('Hello world!')
    expect(endWithPunctuation('Hello world?', '!')).toBe('Hello world?')
    expect(endWithPunctuation('Hello world!', '!')).toBe('Hello world!')

    // if the second parameter is multiple characters, ignore it
    expect(endWithPunctuation('Hello world', '!!')).toBe('Hello world.')
})

test('Formats a number with thousands separators', () => {
    expect(formatNumber('')).toBe('')
    expect(formatNumber('100')).toBe('100')
    expect(formatNumber('1000')).toBe('1,000')
    expect(formatNumber('10,0000,0')).toBe('1,000,000')
    expect(formatNumber('1.')).toBe('1')
    expect(formatNumber('1.0')).toBe('1.0')
    expect(formatNumber('000100')).toBe('100')
    expect(formatNumber('000100.')).toBe('100')
    expect(formatNumber('000100.0')).toBe('100.0')
    expect(() => {formatNumber('hello')}).toThrow()
})

test('Sentence case: First word of every sentence is capitalized', () => {
    expect(sentenceCase('')).toBe('')
    expect(sentenceCase('Hello World')).toBe('Hello world')
    expect(sentenceCase('Hello World. Hello World.')).toBe('Hello world. Hello world.')
    expect(sentenceCase("HOW ARE YOU? I'm OK.")).toBe("How are you? I'm ok.")
    expect(sentenceCase('Exclamation! Wow!')).toBe('Exclamation! Wow!')
    expect(sentenceCase('Items after colons: Should be lowercase')).toBe(
        'Items after colons: should be lowercase'
    )
    expect(sentenceCase('first letter should be caps')).toBe('First letter should be caps')
    expect(sentenceCase('Hello World. hello World.')).toBe('Hello world. Hello world.')
    expect(sentenceCase("HOW ARE YOU? i'm OK.")).toBe("How are you? I'm ok.")
    expect(sentenceCase('Exclamation! wow!')).toBe('Exclamation! Wow!')
    expect(sentenceCase('Items after colons: should be lowercase')).toBe(
        'Items after colons: should be lowercase'
    )
})

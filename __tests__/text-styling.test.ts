import { sentenceCase, endWithPunctuation } from '../text-styling'

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

    test("Colons don't count as punctuation here", () => {
        expect(sentenceCase('Items after colons: Should be lowercase')).toBe(
            'Items after colons: should be lowercase'
        )
        expect(sentenceCase('Items after colons: should be lowercase')).toBe(
            'Items after colons: should be lowercase'
        )
    })
})

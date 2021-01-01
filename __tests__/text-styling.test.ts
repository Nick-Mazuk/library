import {
    sentenceCase,
    endWithPunctuation,
    slugify,
    hash,
    getFileExtension,
    changeFileExtension,
} from '../text-styling'

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

// tests based on https://github.com/simov/slugify/blob/master/test/slugify.js

// eslint-disable-next-line max-lines-per-function -- long just because there are lots of tests
describe('slugify text', () => {
    const strings: [string, string][] = [
        ['', ''],
        ['Hello World', 'hello-world'],
        ['foo bar baz', 'foo-bar-baz'],
        ['foo , bar', 'foo-bar'],
        [' foo bar baz ', 'foo-bar-baz'],
        ['foo, bar baz', 'foo-bar-baz'],
        ['foo- bar baz', 'foo-bar-baz'],
        ['foo] bar baz', 'foo-bar-baz'],
        ['foo  bar--baz', 'foo-bar-baz'],
        ['Foo bAr baZ', 'foo-bar-baz'],
        ['foo_bar. -@-baz!', 'foobar-baz'],

        // latin characters
        ['À', 'a'],
        ['Á', 'a'],
        ['Â', 'a'],
        ['Ã', 'a'],
        ['Ä', 'a'],
        ['Å', 'a'],
        ['Æ', 'ae'],
        ['Ç', 'c'],
        ['È', 'e'],
        ['É', 'e'],
        ['Ê', 'e'],
        ['Ë', 'e'],
        ['Ì', 'i'],
        ['Í', 'i'],
        ['Î', 'i'],
        ['Ï', 'i'],
        ['Ð', 'd'],
        ['Ñ', 'n'],
        ['Ò', 'o'],
        ['Ó', 'o'],
        ['Ô', 'o'],
        ['Õ', 'o'],
        ['Ö', 'o'],
        ['Ő', 'o'],
        ['Ø', 'o'],
        ['Ù', 'u'],
        ['Ú', 'u'],
        ['Û', 'u'],
        ['Ü', 'u'],
        ['Ű', 'u'],
        ['Ý', 'y'],
        ['Þ', 'th'],
        ['ß', 'ss'],
        ['à', 'a'],
        ['á', 'a'],
        ['â', 'a'],
        ['ã', 'a'],
        ['ä', 'a'],
        ['å', 'a'],
        ['æ', 'ae'],
        ['ç', 'c'],
        ['è', 'e'],
        ['é', 'e'],
        ['ê', 'e'],
        ['ë', 'e'],
        ['ì', 'i'],
        ['í', 'i'],
        ['î', 'i'],
        ['ï', 'i'],
        ['ð', 'd'],
        ['ñ', 'n'],
        ['ò', 'o'],
        ['ó', 'o'],
        ['ô', 'o'],
        ['õ', 'o'],
        ['ö', 'o'],
        ['ő', 'o'],
        ['ø', 'o'],
        ['ù', 'u'],
        ['ú', 'u'],
        ['û', 'u'],
        ['ü', 'u'],
        ['ű', 'u'],
        ['ý', 'y'],
        ['þ', 'th'],
        ['ÿ', 'y'],
        ['ẞ', 'ss'],

        // greek characters
        ['α', 'a'],
        ['β', 'b'],
        ['γ', 'g'],
        ['δ', 'd'],
        ['ε', 'e'],
        ['ζ', 'z'],
        ['η', 'h'],
        ['θ', '8'],
        ['ι', 'i'],
        ['κ', 'k'],
        ['λ', 'l'],
        ['μ', 'm'],
        ['ν', 'n'],
        ['ξ', '3'],
        ['ο', 'o'],
        ['π', 'p'],
        ['ρ', 'r'],
        ['σ', 's'],
        ['τ', 't'],
        ['υ', 'y'],
        ['φ', 'f'],
        ['χ', 'x'],
        ['ψ', 'ps'],
        ['ω', 'w'],
        ['ά', 'a'],
        ['έ', 'e'],
        ['ί', 'i'],
        ['ό', 'o'],
        ['ύ', 'y'],
        ['ή', 'h'],
        ['ώ', 'w'],
        ['ς', 's'],
        ['ϊ', 'i'],
        ['ΰ', 'y'],
        ['ϋ', 'y'],
        ['ΐ', 'i'],
        ['Α', 'a'],
        ['Β', 'b'],
        ['Γ', 'g'],
        ['Δ', 'd'],
        ['Ε', 'e'],
        ['Ζ', 'z'],
        ['Η', 'h'],
        ['Θ', '8'],
        ['Ι', 'i'],
        ['Κ', 'k'],
        ['Λ', 'l'],
        ['Μ', 'm'],
        ['Ν', 'n'],
        ['Ξ', '3'],
        ['Ο', 'o'],
        ['Π', 'p'],
        ['Ρ', 'r'],
        ['Σ', 's'],
        ['Τ', 't'],
        ['Υ', 'y'],
        ['Φ', 'f'],
        ['Χ', 'x'],
        ['Ψ', 'ps'],
        ['Ω', 'w'],
        ['Ά', 'a'],
        ['Έ', 'e'],
        ['Ί', 'i'],
        ['Ό', 'o'],
        ['Ύ', 'y'],
        ['Ή', 'h'],
        ['Ώ', 'w'],
        ['Ϊ', 'i'],
        ['Ϋ', 'y'],

        // turkish characters
        ['ş', 's'],
        ['Ş', 's'],
        ['ı', 'i'],
        ['İ', 'i'],
        ['ç', 'c'],
        ['Ç', 'c'],
        ['ü', 'u'],
        ['Ü', 'u'],
        ['ö', 'o'],
        ['Ö', 'o'],
        ['ğ', 'g'],
        ['Ğ', 'g'],

        // cyrillic characters
        ['а', 'a'],
        ['б', 'b'],
        ['в', 'v'],
        ['г', 'g'],
        ['д', 'd'],
        ['е', 'e'],
        ['ё', 'yo'],
        ['ж', 'zh'],
        ['з', 'z'],
        ['и', 'i'],
        ['й', 'j'],
        ['к', 'k'],
        ['л', 'l'],
        ['м', 'm'],
        ['н', 'n'],
        ['о', 'o'],
        ['п', 'p'],
        ['р', 'r'],
        ['с', 's'],
        ['т', 't'],
        ['у', 'u'],
        ['ф', 'f'],
        ['х', 'h'],
        ['ц', 'c'],
        ['ч', 'ch'],
        ['ш', 'sh'],
        ['щ', 'sh'],
        ['ъ', 'u'],
        ['ы', 'y'],
        ['ь', ''],
        ['э', 'e'],
        ['ю', 'yu'],
        ['я', 'ya'],
        ['А', 'a'],
        ['Б', 'b'],
        ['В', 'v'],
        ['Г', 'g'],
        ['Д', 'd'],
        ['Е', 'e'],
        ['Ё', 'yo'],
        ['Ж', 'zh'],
        ['З', 'z'],
        ['И', 'i'],
        ['Й', 'j'],
        ['К', 'k'],
        ['Л', 'l'],
        ['М', 'm'],
        ['Н', 'n'],
        ['О', 'o'],
        ['П', 'p'],
        ['Р', 'r'],
        ['С', 's'],
        ['Т', 't'],
        ['У', 'u'],
        ['Ф', 'f'],
        ['Х', 'h'],
        ['Ц', 'c'],
        ['Ч', 'ch'],
        ['Ш', 'sh'],
        ['Щ', 'sh'],
        ['Ъ', 'u'],
        ['Ы', 'y'],
        ['Ь', ''],
        ['Э', 'e'],
        ['Ю', 'yu'],
        ['Я', 'ya'],
        ['Є', 'ye'],
        ['І', 'i'],
        ['Ї', 'yi'],
        ['Ґ', 'g'],
        ['є', 'ye'],
        ['і', 'i'],
        ['ї', 'yi'],
        ['ґ', 'g'],

        // kazakh characters
        ['Ә', 'ae'],
        ['ә', 'ae'],
        ['Ғ', 'gh'],
        ['ғ', 'gh'],
        ['Қ', 'kh'],
        ['қ', 'kh'],
        ['Ң', 'ng'],
        ['ң', 'ng'],
        ['Ү', 'ue'],
        ['ү', 'ue'],
        ['Ұ', 'u'],
        ['ұ', 'u'],
        ['Һ', 'h'],
        ['һ', 'h'],
        ['Ө', 'oe'],
        ['ө', 'oe'],

        // czech characters
        ['č', 'c'],
        ['ď', 'd'],
        ['ě', 'e'],
        ['ň', 'n'],
        ['ř', 'r'],
        ['š', 's'],
        ['ť', 't'],
        ['ů', 'u'],
        ['ž', 'z'],
        ['Č', 'c'],
        ['Ď', 'd'],
        ['Ě', 'e'],
        ['Ň', 'n'],
        ['Ř', 'r'],
        ['Š', 's'],
        ['Ť', 't'],
        ['Ů', 'u'],
        ['Ž', 'z'],

        // polish characters
        ['ą', 'a'],
        ['ć', 'c'],
        ['ę', 'e'],
        ['ł', 'l'],
        ['ń', 'n'],
        ['ó', 'o'],
        ['ś', 's'],
        ['ź', 'z'],
        ['ż', 'z'],
        ['Ą', 'a'],
        ['Ć', 'c'],
        ['Ę', 'e'],
        ['Ł', 'l'],
        ['Ń', 'n'],
        ['Ś', 's'],
        ['Ź', 'z'],
        ['Ż', 'z'],

        // latvian characters
        ['ā', 'a'],
        ['č', 'c'],
        ['ē', 'e'],
        ['ģ', 'g'],
        ['ī', 'i'],
        ['ķ', 'k'],
        ['ļ', 'l'],
        ['ņ', 'n'],
        ['š', 's'],
        ['ū', 'u'],
        ['ž', 'z'],
        ['Ā', 'a'],
        ['Č', 'c'],
        ['Ē', 'e'],
        ['Ģ', 'g'],
        ['Ī', 'i'],
        ['Ķ', 'k'],
        ['Ļ', 'l'],
        ['Ņ', 'n'],
        ['Š', 's'],
        ['Ū', 'u'],
        ['Ž', 'z'],

        // serbian characters
        ['đ', 'dj'],
        ['ǌ', 'nj'],
        ['ǉ', 'lj'],
        ['Đ', 'dj'],
        ['ǋ', 'nj'],
        ['ǈ', 'lj'],
        ['ђ', 'dj'],
        ['ј', 'j'],
        ['љ', 'lj'],
        ['њ', 'nj'],
        ['ћ', 'c'],
        ['џ', 'dz'],
        ['Ђ', 'dj'],
        ['Ј', 'j'],
        ['Љ', 'lj'],
        ['Њ', 'nj'],
        ['Ћ', 'c'],
        ['Џ', 'dz'],

        // currencies
        ['€', 'euro'],
        ['₢', 'cruzeiro'],
        ['₣', 'french-franc'],
        ['£', 'pound'],
        ['₤', 'lira'],
        ['₥', 'mill'],
        ['₦', 'naira'],
        ['₧', 'peseta'],
        ['₨', 'rupee'],
        ['₩', 'won'],
        ['₪', 'new-shequel'],
        ['₫', 'dong'],
        ['₭', 'kip'],
        ['₮', 'tugrik'],
        ['₸', 'kazakhstani-tenge'],
        ['₯', 'drachma'],
        ['₰', 'penny'],
        ['₱', 'peso'],
        ['₲', 'guarani'],
        ['₳', 'austral'],
        ['₴', 'hryvnia'],
        ['₵', 'cedi'],
        ['¢', 'cent'],
        ['¥', 'yen'],
        ['元', 'yuan'],
        ['円', 'yen'],
        ['﷼', 'rial'],
        ['₠', 'ecu'],
        ['¤', 'currency'],
        ['฿', 'baht'],
        ['$', 'dollar'],
        ['₽', 'russian-ruble'],
        ['₿', 'bitcoin'],
        ['₺', 'turkish-lira'],

        // symbols
        ['©', 'c'],
        ['œ', 'oe'],
        ['Œ', 'oe'],
        ['∑', 'sum'],
        ['®', 'r'],
        ['†', ''],
        ['“', ''],
        ['”', ''],
        ['‘', ''],
        ['’', ''],
        ['∂', 'd'],
        ['ƒ', 'f'],
        ['™', 'tm'],
        ['℠', 'sm'],
        ['…', ''],
        ['˚', 'o'],
        ['º', 'o'],
        ['ª', 'a'],
        ['•', ''],
        ['∆', 'delta'],
        ['∞', 'infinity'],
        ['♥', 'love'],
        ['&', 'and'],
        ['|', 'or'],
        ['<', 'less'],
        ['>', 'greater'],
    ]

    test.each(strings)('"%s" becomes "%s"', (input, result) => {
        expect(slugify(input)).toBe(result)
    })
})

describe('hashes a string', () => {
    const hashes: [string, string][] = [
        ['', ''],
        ['hello world', '0de8bee5d7f9c5d209f8c6fabed0ea84cb3fca1244e8ed38079a61b599a84c47'],
    ]
    test.each(hashes)('hashes "%s" to "%s"', (input, output) => {
        expect(hash(input)).toBe(output)
    })
})

describe('gets the extension for each file name', () => {
    const files: [string, string][] = [
        ['', ''],
        ['.', ''],
        ['hello.', ''],
        ['hello world.png', 'png'],
        ['hello.world.jpg', 'jpg'],
        ['this/file/is/inside/a/folder/hello.world.jpg', 'jpg'],
        ['this-does-not-have-an-extension', ''],
    ]

    test.each(files)('the filename "%s" has extension "%s"', (file, extension) => {
        expect(getFileExtension(file)).toBe(extension)
    })
})

describe('changes the extension for each file name', () => {
    const files: [string, string, string][] = [
        ['', 'webp', ''],
        ['hello.world.png', 'jpg', 'hello.world.jpg'],
        ['hello.world.jpg', 'png', 'hello.world.png'],
        [
            'this/file/is/inside/a/folder/hello.world.jpg',
            'webp',
            'this/file/is/inside/a/folder/hello.world.webp',
        ],
        ['this-does-not-have-an-extension', 'word', ''],
        ['hello.jpg.jpg', 'png', 'hello.jpg.png'],
    ]

    test.each(files)(
        'the file "%s" with new extension "%s" is "%s"',
        (file, newExtension, result) => {
            expect(changeFileExtension(file, newExtension)).toBe(result)
        }
    )
})

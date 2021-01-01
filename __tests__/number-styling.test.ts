import {
    formatNumber,
    isNumber,
    addThousandsSeparators,
    truncateDecimals,
    toPercentage,
    roundDecimals,
    fixedDecimals,
    stringToNumber,
    padZeros,
} from '../number-styling'

const invalidNumbers = [
    ['', 'is empty string'],
    ['hello', 'has letters'],
    ['hello 12', 'has letters'],
    ['3.1@abc4159', 'has letters'],
    ['1 12', 'has spaces'],
    [' 12', 'has spaces'],
    ['12 ', 'has spaces'],
    ['12 .000', 'has spaces'],
    ['3.1415.9', 'has multiple decimals'],
    ['3.14,15.9', 'has multiple decimals'],
    ['3,141.5.9', 'has multiple decimals'],
    ['31415..9', 'has multiple decimals'],
    ['3.1415,9', 'has comma after decimal'],
]

describe('Detect if a string is a number', () => {
    const validNumbers: (number | string)[] = [
        '100',
        '1,000',
        '1,000.0',
        '1000',
        '10,0000,0',
        '31415926535',
        '-31415926535',
        '123.123123123',
        '0',
        '1',
        '0.',
        '1.',
        '000100.',
        '.123',
        '-0',
        '-1',
        1,
        -1,
    ]
    test.each(validNumbers)('%s is a valid number', (string) => {
        expect(isNumber(string)).toBe(true)
    })

    test.each(invalidNumbers)('%s is invalid: %s', (string) => {
        expect(isNumber(string)).toBe(false)
    })
})

describe('Formats a number with thousands separators', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(addThousandsSeparators(string)).toBe('')
        }
    )

    const numbers: [string | number, string, string][] = [
        ['1,000', '1,000', 'already formatted'],
        ['1000', '1,000', 'add thousands separators'],
        ['31415926535', '31,415,926,535', 'add thousands separators'],
        ['10,0000,0', '1,000,000', 'remove incorrect separators'],
        ['123.123123123', '123.123123123', 'remove incorrect separators'],
        ['123,123.123123123', '123,123.123123123', "don't affect decimals"],
        ['-1000', '-1,000', 'keeps negative sign'],
        ['-0', '-0', 'works with negative 0'],
        [1000, '1,000', 'also works with numbers'],
    ]

    test.each(numbers)('"%s" should be "%s": %s', (number, result) => {
        expect(addThousandsSeparators(number)).toBe(result)
    })
})

describe('truncates decimal', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(truncateDecimals(string, 2)).toBe('')
        }
    )

    const preformattedNumbers = ['123,123', '314159']
    test.each(preformattedNumbers)('numbers without decimals remain unchanged: "%s"', (string) => {
        expect(truncateDecimals(string, 2)).toBe(string)
    })

    const numbers: [string | number, number, string][] = [
        ['3.14159', 0, '3'],
        ['3.14159', 1, '3.1'],
        ['3.14159', 2, '3.14'],
        ['3.14159', 3, '3.141'],
        ['3.14159', 4, '3.1415'],
        ['3.14159', 5, '3.14159'],
        ['3', 5, '3'],
        ['3.1', 5, '3.1'],
        ['3.14', 5, '3.14'],
        ['3.141', 5, '3.141'],
        ['3.1415', 5, '3.1415'],
        ['3.', 5, '3.'],
        [100.123, 1, '100.1'],
        [100.123, 4, '100.123'],
        [-100.123, 1, '-100.1'],
        ['-3.1415', 5, '-3.1415'],
        ['-0', 5, '-0'],
    ]
    test.each(numbers)(
        'decimals are truncated: "%s" truncated by "%s" results in "%s"',
        (number, digits, result) => {
            expect(truncateDecimals(number, digits)).toBe(result)
        }
    )
})

describe('rounds decimal', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(roundDecimals(string, 2)).toBe('')
        }
    )

    const preformattedNumbers = ['123,123', '314159']
    test.each(preformattedNumbers)('numbers without decimals remain unchanged: "%s"', (string) => {
        expect(roundDecimals(string, 2)).toBe(string)
    })

    const numbers: [string | number, number, string][] = [
        ['3.14159', 0, '3'],
        ['3.14159', 1, '3.1'],
        ['3.14159', 2, '3.14'],
        ['3.14159', 3, '3.142'],
        ['3.14159', 4, '3.1416'],
        ['3.14159', 5, '3.14159'],
        ['3', 5, '3'],
        ['3.1', 5, '3.1'],
        ['3.14', 5, '3.14'],
        ['3.141', 5, '3.141'],
        ['3.1415', 5, '3.1415'],
        ['3.', 5, '3.'],
        [100.123, 1, '100.1'],
        [100.123, 4, '100.123'],
        [100.15, 1, '100.2'],
        ['3.49', 0, '3'],
        ['3.5', 0, '4'],
        ['-3.5', 0, '-3'],
        [-100.123, 1, '-100.1'],
        ['-3.14159', 5, '-3.14159'],
        ['-0', 5, '-0'],
    ]
    test.each(numbers)(
        'decimals are rounded: "%s" truncated by "%s" results in "%s"',
        (number, digits, result) => {
            expect(roundDecimals(number, digits)).toBe(result)
        }
    )
})

// eslint-disable-next-line max-lines-per-function -- long only because there are lots of test cases
describe('fixes a number to a certain number of decimals', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(fixedDecimals(string, 2)).toBe('')
        }
    )

    const preformattedNumbers = ['123,123', '314159']
    test.each(preformattedNumbers)('numbers without decimals remain unchanged: "%s"', (string) => {
        expect(roundDecimals(string, 2)).toBe(string)
    })

    const numbers: [string | number, number, string][] = [
        ['3.14159', 0, '3'],
        ['3.14159', 1, '3.1'],
        ['3.14159', 2, '3.14'],
        ['3.14159', 3, '3.141'],
        ['3.14159', 4, '3.1415'],
        ['3.14159', 5, '3.14159'],
        ['3.14159', 6, '3.141590'],
        ['3.14159', 7, '3.1415900'],
        ['3.14159', 8, '3.14159000'],
        ['3', 5, '3.00000'],
        ['3.1', 5, '3.10000'],
        ['3.14', 5, '3.14000'],
        ['3.141', 5, '3.14100'],
        ['3.1415', 5, '3.14150'],
        ['-3.14159', 0, '-3'],
        ['-3.14159', 1, '-3.1'],
        ['-3.14159', 2, '-3.14'],
        ['-3.14159', 3, '-3.141'],
        ['-3.14159', 4, '-3.1415'],
        ['-3.14159', 5, '-3.14159'],
        ['-3.14159', 6, '-3.141590'],
        ['-3.14159', 7, '-3.1415900'],
        ['-3.14159', 8, '-3.14159000'],
        ['-3', 0, '-3'],
        ['-3', 5, '-3.00000'],
        ['-3.1', 5, '-3.10000'],
        ['-3.14', 5, '-3.14000'],
        ['-3.141', 5, '-3.14100'],
        ['-3.1415', 5, '-3.14150'],
        ['3.', 0, '3'],
        [100.123, 1, '100.1'],
        [100.123, 4, '100.1230'],
        [100.15, 1, '100.1'],
        ['3.49', 0, '3'],
        ['3.5', 0, '3'],
        ['-3.5', 0, '-3'],
        [-100.123, 1, '-100.1'],
        ['-3.14159', 4, '-3.1415'],
        ['-0', 0, '-0'],
    ]
    test.each(numbers)(
        'decimals are fixed: "%s" with "%s" fixed decimals results in "%s"',
        (number, digits, result) => {
            expect(fixedDecimals(number, digits)).toBe(result)
        }
    )
})

describe('formats number completely', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(formatNumber(string)).toBe('')
        }
    )

    const numbers: [string | number, string, string][] = [
        ['100', '100', 'already formatted'],
        ['1,000', '1,000', 'already formatted'],
        ['1,000.0', '1,000.0', 'already formatted'],
        ['0', '0', 'already formatted'],
        ['1', '1', 'already formatted'],
        ['000100', '100', 'remove leading zeros'],
        ['000100.', '100', 'remove leading zeros'],
        ['0,00100.0', '100.0', 'remove leading zeros'],
        ['0.0', '0.0', 'remove leading zeros'],
        ['0.1', '0.1', 'remove leading zeros'],
        ['1.0', '1.0', 'zeros after the decimal should be kept'],
        ['0.000', '0.000', 'zeros after the decimal should be kept'],
        ['1.', '1', 'no dangling periods'],
        ['0.', '0', 'no dangling periods'],
        ['211.', '211', 'no dangling periods'],
        [314159.26535, '314,159.26535', 'also works with numbers'],
        [-314159.26535, '-314,159.26535', 'works with negative numbers'],
        [-0, '0', 'negative becomes 0'],
        ['-0', '0', 'negative becomes 0'],
    ]
    test.each(numbers)('"%s" should be "%s": "%s"', (number, result) => {
        expect(formatNumber(number)).toBe(result)
    })
})

describe('turns numbers into percentages', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(toPercentage(string)).toBe('')
        }
    )

    const numbers: [string | number, number, string][] = [
        ['0.314159', 0, '31%'],
        ['0.271828', 1, '27.2%'],
        [0.123, 1, '12.3%'],
        [0.123, 2, '12.3%'],
        [0.12345, 2, '12.35%'],
        ['1.234', 0, '123%'],
        ['12.34', 0, '1,234%'],
        ['-12.34', 0, '-1,234%'],
        ['-0', 0, '0%'],
    ]
    test.each(numbers)(
        'turned to percentage: "%s" truncated by "%s" results in "%s"',
        (number, decimals, result) => {
            expect(toPercentage(number, decimals)).toBe(result)
        }
    )
})

describe('turns number strings into number types', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(stringToNumber(string)).toBe(NaN)
        }
    )

    const numbers: [string, number][] = [
        ['0.314159', 0.314159],
        ['0.271828', 0.271828],
        ['1.234', 1.234],
        ['-12.34', -12.34],
        ['1,000', 1000],
        ['1,000.0', 1000],
        ['0', 0],
        ['1', 1],
        ['000100', 100],
        ['000100.', 100],
        ['0,00100.0', 100],
        ['0.0', 0],
        ['0.1', 0.1],
        ['1.0', 1],
        ['0.000', 0],
        ['1.', 1],
        ['0.', 0],
        ['211.', 211],
        ['-0', -0],
    ]
    test.each(numbers)('turned string "%s" into number %s', (number, result) => {
        expect(stringToNumber(number)).toBe(result)
    })
})

describe('adds zeros to the front of the string such that it has the required number of digits', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(padZeros(string, 2)).toBe('')
        }
    )

    const numbers: [string | number, number, string][] = [
        ['1', 1, '1'],
        ['-1', 1, '-1'],
        ['1', 3, '001'],
        ['-1', 3, '-001'],
        ['-1.0', 3, '-001.0'],
    ]
    test.each(numbers)('number "%s" padding with "%s" zeros is %s', (number, zeros, result) => {
        expect(padZeros(number, zeros)).toBe(result)
    })
})

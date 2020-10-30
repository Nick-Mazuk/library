import {
    formatNumber,
    stringIsNumber,
    addThousandsSeparators,
    truncateDecimals,
} from '../number-styling'

const invalidNumbers = [
    ['', 'is empty string'],
    ['hello', 'has letters'],
    ['hello 12', 'has letters'],
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
    const validNumbers = [
        '100',
        '1,000',
        '1,000.0',
        '1000',
        '10,0000,0',
        '31415926535',
        '123.123123123',
    ]
    test.each(validNumbers)('%s is a valid number', (string) => {
        expect(stringIsNumber(string)).toBe(true)
    })

    test.each(invalidNumbers)('%s is invalid: %s', (string) => {
        expect(stringIsNumber(string)).toBe(false)
    })
})

describe('Formats a number with thousands separators', () => {
    test.each(invalidNumbers)(
        'base case: strings that aren\'t valid numbers an empty string: "%s"',
        (string) => {
            expect(addThousandsSeparators(string)).toBe('')
        }
    )

    const numbers: [string, string, string][] = [
        ['1,000', '1,000', 'already formatted'],
        ['1000', '1,000', 'add thousands separators'],
        ['31415926535', '31,415,926,535', 'add thousands separators'],
        ['10,0000,0', '1,000,000', 'remove incorrect separators'],
        ['123.123123123', '123.123123123', 'remove incorrect separators'],
        ['123,123.123123123', '123,123.123123123', "don't affect decimals"],
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

    const numbers: [string, number, string][] = [
        ['3.14159', 0, '3'],
        ['3.14159', 1, '3.1'],
        ['3.14159', 2, '3.14'],
        ['3.14159', 3, '3.141'],
        ['3.14159', 4, '3.1415'],
        ['3.14159', 5, '3.14159'],
    ]
    test.each(numbers)(
        'decimals are truncated: "%s" truncated by "%s" results in "%s"',
        (number, digits, result) => {
            expect(truncateDecimals(number, digits)).toBe(result)
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

    const numbers: [string, string, string][] = [
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
        ['211.', '211', 'no dangling periods'],
    ]
    test.each(numbers)('"%s" should be "%s": "%s"', (number, result) => {
        expect(formatNumber(number)).toBe(result)
    })
})

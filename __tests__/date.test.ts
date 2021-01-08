import {
    dateToMonthDDYYYY,
    dateToMonDDYYYY,
    isValidDate,
    dateStringToMilli,
    dateToMDYYYY,
} from '../time'

/* eslint-disable no-magic-numbers -- going to be lots of magic numbers in this file */

const invalidDateStrings: string[] = ['', 'complete nonsense']
const invalidDateNumbers: number[] = [-123, 1.23, -12432535.124]
const invalidDates: (string | number)[] = [...invalidDateNumbers, ...invalidDateStrings]

describe('detects valid dates', () => {
    test.each(invalidDates)('invalid date "%s" returns false', (input) => {
        expect(isValidDate(input)).toBeFalsy()
    })

    const validDates = [
        1603840000000,
        'Oct 27, 2020',
        'October 27, 2020',
        '2020-02-30',
        '2019-02-29',
        '2020-04-31',
        '2020/03-15',
        'Octuber 27, 2020',
    ]

    test.each(validDates)('valid date "%s" returns true', (input) => {
        expect(isValidDate(input)).toBeTruthy()
    })
})

describe('converts dates to Month DD, YYYY', () => {
    test.each(invalidDates)(
        'base case: dates that aren\'t valid return an empty string: "%s"',
        (date) => {
            expect(dateToMonthDDYYYY(date)).toBe('')
        }
    )

    const dates: [number | string, string][] = [
        [1603840000000, 'October 27, 2020'],
        [1583010800000, 'February 29, 2020'],
        [1551388400000, 'February 28, 2019'],
        [1588281200000, 'April 30, 2020'],
        [1584255600000, 'March 15, 2020'],
        ['Oct 24, 1998', 'October 24, 1998'],
    ]

    test.each(dates)('date "%s" converted to "%s"', (milliseconds, dateString) => {
        expect(dateToMonthDDYYYY(milliseconds)).toBe(dateString)
    })
})

describe('converts dates to Mon DD, YYYY', () => {
    test.each(invalidDates)(
        'base case: dates that aren\'t valid return an empty string: "%s"',
        (date) => {
            expect(dateToMonDDYYYY(date)).toBe('')
        }
    )

    const dates: [number | string, string][] = [
        [1603840000000, 'Oct 27, 2020'],
        [1583010800000, 'Feb 29, 2020'],
        [1551388400000, 'Feb 28, 2019'],
        [1588281200000, 'Apr 30, 2020'],
        [1584255600000, 'Mar 15, 2020'],
        ['October 24, 1998', 'Oct 24, 1998'],
    ]

    test.each(dates)('date "%s" converted to "%s"', (milliseconds, dateString) => {
        expect(dateToMonDDYYYY(milliseconds)).toBe(dateString)
    })
})

describe('converts dates to M/D/YYYY', () => {
    test.each(invalidDates)(
        'base case: dates that aren\'t valid return an empty string: "%s"',
        (date) => {
            expect(dateToMDYYYY(date)).toBe('')
        }
    )

    const dates: [number | string, string][] = [
        [1603840000000, '10/27/2020'],
        [1583010800000, '2/29/2020'],
        [1551388400000, '2/28/2019'],
        [1588281200000, '4/30/2020'],
        [1584255600000, '3/15/2020'],
        ['October 24, 1998', '10/24/1998'],
    ]

    test.each(dates)('date "%s" converted to "%s"', (milliseconds, dateString) => {
        expect(dateToMDYYYY(milliseconds)).toBe(dateString)
    })
})

describe('converts date strings to milliseconds', () => {
    test.each(invalidDateStrings)(
        'base case: dates that aren\'t valid return an empty string: "%s"',
        (date) => {
            expect(dateStringToMilli(date)).toBe(-1)
        }
    )

    const dates: [string, number][] = [
        ['Oct 27, 2020', 1603756800000],
        ['October 27, 2020', 1603756800000],
        ['2020-02-30', 1583020800000],
        ['2019-02-29', 1551398400000],
        ['2020-04-31', 1588291200000],
        ['2020/03-15', 1584230400000],
        ['Octuber 27, 2020', 1603756800000],
    ]

    test.each(dates)(
        'date string converted to "%s" converted to "%s" milliseconds',
        (dateString, milliseconds) => {
            expect(dateStringToMilli(dateString)).toBe(milliseconds)
        }
    )
})

/* eslint-enable no-magic-numbers -- going to be lots of magic numbers in this file */

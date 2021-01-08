import { isObjectEmpty } from '../objects'

describe('detect if an object is empty', () => {
    test('empty objects return true', () => {
        expect(isObjectEmpty({})).toBeTruthy()
    })

    const filledObjects = [
        { hello: 'world' },
        { key1: 'value 1', key2: 'value 2' },
        { emptyString: '' },
    ]

    test.each(filledObjects)('filled object "%s" returns false', (input) => {
        expect(isObjectEmpty(input)).toBeFalsy()
    })
})

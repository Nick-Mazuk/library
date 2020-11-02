import { weightedAverage } from '../math'

describe('weighted average', () => {
    const averages: [[number, number][], number][] = [
        [
            [
                [1, 1],
                [0, 1],
            ],
            0.5,
        ],
        [
            [
                [1, 0.5],
                [0, 0.5],
            ],
            0.5,
        ],
        [
            [
                [1, 99],
                [0, 1],
            ],
            0.99,
        ],
        [
            [
                [1, 99],
                [1, 1],
            ],
            1,
        ],
        [
            [
                [1, 0.99],
                [1, 0.01],
            ],
            1,
        ],
        [
            [
                [1, 75],
                [0.75, 20],
                [0.25, 5],
            ],
            0.9125,
        ],
    ]
    test.each(averages)('"%s" averages to "%s"', (inputs, average) => {
        expect(weightedAverage(inputs)).toBe(average)
    })
})

// input is [value, weight][]
export const weightedAverage = (stats: [number, number][]): number => {
    let sum = 0
    let total = 0
    stats.forEach((stat) => {
        sum += stat[0] * stat[1]
        total += stat[1]
    })
    return sum / total
}

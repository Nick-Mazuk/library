export const isObjectEmpty = (object: Record<string, unknown>): boolean => {
    return Object.keys(object).length === 0
}

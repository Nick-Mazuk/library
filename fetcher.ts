export const fetcher = async function (
    ...args: [string, Record<string, unknown>]
): Promise<Record<string, unknown>> {
    const res = await fetch(...args)

    return res.json()
}

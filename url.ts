type QueryParameter = [string, string]

const buildParameterString = (
    parameterMap: Map<string, string>,
    queryParameters: QueryParameter[],
    previousParametersArray: QueryParameter[],
    previousParametersSet: Set<string>
) => {
    const parsedParameterArray: string[] = []

    previousParametersArray.forEach(([key]) => {
        parsedParameterArray.push(`${key}=${parameterMap.get(key)}`)
    })

    queryParameters.forEach(([key]) => {
        if (!previousParametersSet.has(key) && typeof parameterMap.get(key) === 'string')
            parsedParameterArray.push(`${key}=${parameterMap.get(key)}`)
    })
    return parsedParameterArray.join('&')
}

const parseUrlPath = (path: string): string => {
    const parts = path.split('?')
    const [basePath] = parts
    return basePath.endsWith('/') ? basePath : `${basePath}/`
}

export const appendQueryParameters = (
    url: string,
    queryParameters: QueryParameter[],
    allowEmptyValues?: boolean
): string => {
    const urlParts = url.split('?')
    const parameterMap = new Map<string, string>()
    const previousParameters = urlParts[1] ? urlParts[1].split('&') : []
    const previousParametersSet = new Set<string>()
    const previousParametersArray: [string, string][] = []
    previousParameters.forEach((parameterString) => {
        const parts = parameterString.split('=')
        if ((parts[1] && parts[1] !== '') || allowEmptyValues) {
            parameterMap.set(parts[0], parts[1])
            previousParametersSet.add(parts[0])
            previousParametersArray.push([parts[0], parts[1]])
        }
    })
    queryParameters.forEach(([key, value]) => {
        if (value !== '' || allowEmptyValues) parameterMap.set(key, value)
    })

    const parameterString = buildParameterString(
        parameterMap,
        queryParameters,
        previousParametersArray,
        previousParametersSet
    )
    return `${urlParts[0]}${parameterString === '' ? '' : '?'}${parameterString}`
}

export const isParentPath = (basePath: string, currentPath: string): boolean => {
    if (basePath === '/') return false
    const parsedBasePath = parseUrlPath(basePath)
    const parsedCurrentPath = parseUrlPath(currentPath)
    return parsedCurrentPath.startsWith(parsedBasePath)
}

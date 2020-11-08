type Parameters = {
    display?: 'popup' | 'page'
    redirectTo?: string
}

export const createFacebookShareLink = (url: string, parameters?: Parameters): string => {
    return `https://www.facebook.com/sharer/sharer.php?u=${url}${
        parameters?.display ? `&display=${parameters.display}` : ''
    }${parameters?.redirectTo ? `&redirect_uri=${parameters.redirectTo}` : ''}`
}

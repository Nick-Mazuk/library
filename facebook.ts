type Parameters = {
    display?: 'popup' | 'page'
    redirectTo?: string
}

export const createFacebookShareLink = (url: string, parameters?: Parameters): string => {
    let shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    if (parameters?.display) shareUrl += `&display=${parameters.display}`
    if (parameters?.redirectTo) shareUrl += `&redirect_uri=${parameters.redirectTo}`
    return shareUrl
}

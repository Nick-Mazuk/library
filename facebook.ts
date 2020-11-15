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

export const isFacebookUrl = (url: string): boolean => {
    if (url.match(/^(https:\/\/)?(www\.)?facebook\.com.*/u)) return true
    if (url.match(/^(http:\/\/)?(www\.)?facebook\.com.*/u)) return true
    return false
}

export const isFacebookPageUrl = (url: string): boolean => {
    if (!isFacebookUrl(url)) return false
    if (url.match(/facebook.com\/[^/]+$/u)) return true
    if (url.match(/facebook.com\/[^/]+\/$/u)) return true
    return false
}

export const isFacebookGroupUrl = (url: string): boolean => {
    if (!isFacebookUrl(url)) return false
    if (url.match(/facebook.com\/groups\/feed\/.*$/u)) return false
    if (url.match(/facebook.com\/groups\/feed$/u)) return false
    if (url.match(/facebook.com\/groups\/.+/u)) return true
    return false
}

export const isYouTubeUrl = (url: string): boolean => {
    if (url.match(/^(https:\/\/)?(www\.)?youtube\.com.+/u)) return true
    if (url.match(/^(http:\/\/)?(www\.)?youtube\.com.+/u)) return true
    if (url.match(/^(https:\/\/)?youtu\.be\/.+/u)) return true
    if (url.match(/^(http:\/\/)?youtu\.be\/.+/u)) return true
    return false
}

export const isYouTubeVideoUrl = (url: string): boolean => {
    if (!isYouTubeUrl(url)) return false
    if (url.match(/watch\?v=/u)) return true
    if (url.match(/youtu\.be/u)) return true
    return false
}

/* note: YouTube ids may not always be 11 characters
   and do not have a defined character set */

export const getYouTubeVideoId = (url: string): string => {
    if (!isYouTubeUrl(url)) return ''
    if (url.match(/youtu\.be\//u)) return url.split(/(youtu\.be\/)|\?/u)[2]
    const urlParameters = new URLSearchParams(url.split('?')[1])
    return urlParameters.get('v') ?? ''
}

export const isYouTubeChannelUrl = (url: string): boolean => {
    if (!isYouTubeUrl(url)) return false
    if (isYouTubeVideoUrl(url)) return false
    if (url.match(/\/playlist/u)) return false
    if (url.endsWith('youtube.com') || url.endsWith('youtube.com/')) return false
    return true
}

export const getYouTubeChannelId = (url: string): string => {
    if (!isYouTubeChannelUrl(url)) return ''
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    const paths = parsedUrl.pathname.split('/')
    return paths[paths.length - 1]
}

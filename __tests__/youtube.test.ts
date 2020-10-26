import { isValidYouTubeVideoUrl } from '../youtube';

describe('Should detect valid YouTube video urls', () => {
    test('empty string should return false', () => {
        expect(isValidYouTubeVideoUrl('')).toBe(false)
    })
})
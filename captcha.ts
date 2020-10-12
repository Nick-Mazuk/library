type ErrorCodes =
    | 'missing-input-secret'
    | 'invalid-input-secret'
    | 'missing-input-response'
    | 'invalid-input-response'
    | 'bad-request'
    | 'invalid-or-already-seen-response'
    | 'sitekey-secret-mismatch'

export type Response = {
    /* eslint-disable camelcase -- 3rd-party api naming */
    success: boolean
    challenge_ts: string
    hostname: string
    credit?: boolean
    'error-codes'?: ErrorCodes[]
    /* eslint-enable camelcase -- 3rd-party api naming */
}

export const validateToken = (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            resolve(true)
            return
        }
        fetch('https://hcaptcha.com/siteverify', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: `response=${token}&secret=${process.env.CAPTCHA_SECRET}`,
        })
            .then((response) => {
                if (response.status < 200 || response.status >= 300)
                    throw new Error('There was an error validating the token.')
                return response.json()
            })
            .then((data: Response) => {
                if (data.success) {
                    resolve(true)
                    return
                }
                throw data['error-codes']
            })
            .catch((error) => {
                reject(error)
            })
    })
}

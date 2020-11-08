import { createMailtoLink } from '../email'

describe('creates mailto url', () => {
    const recipients = ['hello@example.com']
    test.each(recipients)('creates email for "%s"', (recipient) => {
        expect(createMailtoLink({ to: recipient })).toBe(`mailto:${recipient}`)
    })
})

/* eslint-disable camelcase -- many non-camelcase names are from 3rd-party APIs*/
import type { NextWebVitalsMetric } from 'next/app'
import Router from 'next/router'

type Event = { action: string; category: string; label: string; value: string }

declare global {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- only way to remove erroneous type error
    interface Window {
        gtag: any
    }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string): void => {
    if (process.env.NODE_ENV === 'production') {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        })
    }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: Event): void => {
    if (process.env.NODE_ENV === 'production') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

export const trackPageChanges = (): (() => void) => {
    if (process.env.NODE_ENV === 'production') {
        const handleRouteChange = (url: string) => {
            pageView(url)
        }
        Router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }
    return Function
}

export const webVitals = (metric: NextWebVitalsMetric): void => {
    if (process.env.NODE_ENV === 'production') {
        window.gtag('send', 'event', {
            eventCategory: metric.label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
            eventAction: name,
            eventValue: Math.round(name === 'CLS' ? metric.value * 1000 : metric.value),
            eventLabel: metric.id,
            nonInteraction: true,
        })
    }
}

export const trackingCode = (
    // eslint-disable-next-line react/jsx-no-useless-fragment -- prevents syntax error
    <>
        {process.env.NODE_ENV === 'production' && (
            <>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                    defer
                />
                <script
                    // eslint-disable-next-line react/no-danger -- must be used to load Google Analytics
                    dangerouslySetInnerHTML={{
                        __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
                    }}
                />
            </>
        )}
    </>
)

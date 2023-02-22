import ga4 from 'react-ga4'

import { GA_TRACKING_ID } from '~/constants/environment-variables'

export const init = () => ga4.initialize(GA_TRACKING_ID, {})

export const sendEvent = (category: string, action: string, label?: string) =>
  ga4.event({
    category,
    action,
    label,
  })

export const sendPageview = (path: string) =>
  ga4.send({
    hitType: 'pageview',
    page: path,
  })

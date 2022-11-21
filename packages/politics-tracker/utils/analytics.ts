import ReactGA from 'react-ga'
import { gaTrackingId } from '~/constants/config'

export const initGA = () => {
  // console.log('GA init')
  ReactGA.initialize(gaTrackingId)
}

export const logPageView = () => {
  // console.log(`Logging pageview for ${window.location.pathname}`)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logGAEvent = (action = '', label = '') => {
  if (action) {
    ReactGA.event({
      action,
      label,
      category: 'Projects_PoliticsTracker',
    })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}

/**
 * References:
 * https://developers.google.com/sheets/api/quickstart/nodejs
 */

import { google } from 'googleapis'

import {
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REDIRECT_URIS,
  OAUTH_REFRESH_TOKEN,
} from '~/constants/config'

export function loadCredentails() {
  try {
    const oAuth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      OAUTH_REDIRECT_URIS[0]
    )

    oAuth2Client.setCredentials(OAUTH_REFRESH_TOKEN)

    return oAuth2Client
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log(err)
    return null
  }
}

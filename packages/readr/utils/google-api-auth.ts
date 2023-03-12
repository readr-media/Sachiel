/**
 * References:
 * https://developers.google.com/sheets/api/quickstart/nodejs
 */

import { google } from 'googleapis'

import CREDENTIALS from '~/constants/credentials.json'
import TOKEN from '~/constants/token.json'

interface CredentialInfo {
  installed: {
    client_id?: string
    client_secret?: string
    redirect_uris?: string[]
  }
}

function authorize(credentials: CredentialInfo) {
  const {
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uris: redirectUris = [],
  } = credentials.installed ?? {}
  const oAuth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris[0]
  )
  oAuth2Client.setCredentials(TOKEN)

  return oAuth2Client
}

export const googleApiAuth = authorize(CREDENTIALS)

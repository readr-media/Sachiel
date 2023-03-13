/**
 * References:
 * https://developers.google.com/sheets/api/quickstart/nodejs
 */

import { readFile } from 'fs/promises'
import { google } from 'googleapis'
import { join } from 'path'
import { cwd } from 'process'

const CREDENTIAL_PATH = join(cwd(), '/constants', 'credentials.json')
const TOKEN_PATH = join(cwd(), '/constants', 'token.json')

export async function loadCredentails() {
  try {
    let content = await readFile(CREDENTIAL_PATH)
    const credential = JSON.parse(String(content))
    const {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uris: redirectUris = [],
    } = credential.installed ?? {}
    const oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUris[0]
    )

    content = await readFile(TOKEN_PATH)
    const token = JSON.parse(String(content))
    oAuth2Client.setCredentials(token)

    return oAuth2Client
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log(err)
    return null
  }
}

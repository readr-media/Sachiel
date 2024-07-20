import { sendSignInLinkToEmail } from 'firebase/auth'

import { FIREBASE_CONFIG } from '@/constants/config'
import { auth } from '@/firebase/client'

const actionCodeSettings = {
  url: `https://${FIREBASE_CONFIG.AUTH_DOMAIN}/login`,
  handleCodeInApp: true,
}

export async function sendEmailLink(email: string) {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email)
  } catch (error) {
    console.error(`Failed to send sign-in link to ${email}`, error)
  }
}

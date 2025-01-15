import {
  browserLocalPersistence,
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthProvider,
  sendSignInLinkToEmail,
  setPersistence,
  signInWithRedirect,
} from 'firebase/auth'

import { FIREBASE_CONFIG } from '@/constants/config'
import { auth } from '@/firebase/client'

export const loginOptions = [
  {
    method: 'apple',
    iconName: 'icon-apple',
  },
  {
    method: 'facebook',
    iconName: 'icon-facebook-square',
  },
  {
    method: 'google',
    iconName: 'icon-google',
  },
  {
    method: 'email',
    iconName: 'icon-email',
  },
] as const

export type LoginMethod = typeof loginOptions[number]['method']

const actionCodeSettings = {
  url: `https://${FIREBASE_CONFIG.AUTH_DOMAIN}/login`,
  handleCodeInApp: true,
}

export const handleAuthProvider = async (
  method: Exclude<LoginMethod, 'email'>
) => {
  const provider = createAuthProvider(method)
  if (provider) {
    await setPersistence(auth, browserLocalPersistence)
    await signInWithRedirect(auth, provider)
  }
}

export async function sendEmailLink(email: string) {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings)
    window.localStorage.setItem('emailForSignIn', email)
  } catch (error) {
    console.error(`Failed to send sign-in link to ${email}`, error)
  }
}

function createAuthProvider(method: LoginMethod) {
  let provider = null
  switch (method) {
    case 'apple':
      provider = new OAuthProvider('apple.com')
      break
    case 'facebook':
      provider = new FacebookAuthProvider()
      break
    case 'google':
      provider = new GoogleAuthProvider()
      break
    default:
      return null
  }
  provider.addScope('email')
  return provider
}

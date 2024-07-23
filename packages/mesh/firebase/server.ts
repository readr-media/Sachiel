import 'server-only'

import { cert, getApp, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CONFIG,
  FIREBASE_PRIVATE_KEY,
} from '@/constants/config'

function getAdminApp() {
  let app

  try {
    app = getApp()
  } catch (e) {
    app = initializeApp({
      credential: cert({
        projectId: FIREBASE_CONFIG.PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    })
  }
  return app
}

function getAdminAuth() {
  return getAuth(getAdminApp())
}

export { getAdminApp, getAdminAuth }

import 'server-only'

import admin from 'firebase-admin'

import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_CONFIG,
  FIREBASE_PRIVATE_KEY,
} from '@/constants/config'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_CONFIG.PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  })
}

export default admin

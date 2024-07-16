import { clearTokenCookie } from '@/app/actions/auth'
import { auth } from '@/firebase/client'

export async function logout() {
  try {
    await auth.signOut()
    await clearTokenCookie()
  } catch (error) {
    console.error('Logout Error', error)
  }
}

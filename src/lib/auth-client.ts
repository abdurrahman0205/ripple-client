import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL as string,
  plugins: [
    jwtClient()
  ]
})

export const { signIn,signOut, signUp, useSession } = createAuthClient()
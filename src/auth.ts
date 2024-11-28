import NextAuth from "next-auth"
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id"
import { db } from "@/db/drizzle"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false
      
      try {
        // Check if user exists
        const existingUser = await db.select()
          .from(users)
          .where(eq(users.email, user.email))
          .limit(1)

        if (existingUser.length === 0) {
          // Create new user if they don't exist
          await db.insert(users).values({
            name: user.name || '',
            email: user.email,
          })
        } else {
          // Update existing user's info
          await db.update(users)
            .set({
              name: user.name || existingUser[0].name,
            })
            .where(eq(users.email, user.email))
        }
        
        return true
      } catch (error) {
        console.error('Error syncing user:', error)
        return false
      }
    },
    async session({ session, user }) {
      // Add database user info to session
      if (session.user?.email) {
        const dbUser = await db.select()
          .from(users)
          .where(eq(users.email, session.user.email))
          .limit(1)
        
        if (dbUser[0]) {
          session.user.id = dbUser[0].id
          // Add additional user fields here as needed
        }
      }
      return session
    }
  }
})
import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { 
        params: { 
          scope: 'identify email',
          prompt: 'none'
        } 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.discordId = (profile as any).id
        token.picture = (profile as any).image_url || `https://cdn.discordapp.com/avatars/${(profile as any).id}/${(profile as any).avatar}.png`
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        ;(session.user as any).discordId = token.discordId
        session.user.image = token.picture as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

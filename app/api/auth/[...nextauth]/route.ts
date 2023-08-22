import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/src/libs/prismadb"
import { Adapter } from "next-auth/adapters"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Invalid Input');
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email.toLowerCase()
            }
          });

          if (!user || !user?.hashedPassword) {
            throw new Error('Invalid Password');
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          console.log("Password comparison result:", isCorrectPassword);

          if (!isCorrectPassword) {
            throw new Error('Invalid credentials');
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error('Invalid credentials');
        }
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export {handler as POST , handler as GET}

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { getLogin } from "@/lib/Apis";
import email from "next-auth/providers/email";

interface CredentialsAuthorize {
  email: string;
  password: string;
  redirectTo: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const body = {
          email: credentials.email as string,
          password: credentials.password as string,
        }
        const data = await getLogin(body);
        const user = {
          image: "",
          accessToken: data.access_token,
          refresh_token: data.access_token
        }
        return user;
      },
    }),
  ],
  session: {
    strategy: 'jwt', // 1 hora
    // maxAge: 60, // 1 minuto
  },
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/login",
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      const decoded = jwtDecode(user ? user?.accessToken : token?.accessToken);
      const data = {
        ...decoded,
        ...token,
        ...user,
      }    
      return data;
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...token,
        },
      }
    },
  }
})
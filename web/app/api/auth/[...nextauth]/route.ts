import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "E-Posta", type: "text", placeholder: "E-Posta" },
                password: { label: "Parola", type: "password" },
            },
            async authorize(credentials, req) {
                console.log(1, credentials);

                if (credentials?.username == "said@yeter.com" && credentials.password == "wer") {
                    return { id: "1", name: "said", email: "said@yeter.com" }
                }

                return null
            }
        })
    ]
})

export { handler as GET, handler as POST }
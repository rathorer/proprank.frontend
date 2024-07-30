import { defineConfig } from 'auth-astro'
import { loginUser } from './src/services/api';
import Credentials from "@auth/core/providers/credentials"

const CustomJWTProvider = Credentials({
	id: "customjwt",
	name: "customjwt",
	type: "credentials",

	credentials: {
		email: { label: "Email", type: "text" },
		password: { label: "Password", type: "password" }
	},
	async authorize({ email, password }) {
		console.log(email, "auth.config");
		const response = await loginUser({ email, password });
		if (response.status === 200) {
			// console.log(response.result);
			return { ...response.result };
		}
		// console.log(email, password, "cred");
		// const res = await fetch("http://localhost:8000/api/user/login", {
		// 	method: 'POST',
		// 	body: JSON.stringify({ email, password }),
		// 	headers: { "Content-Type": "application/json" }
		// })
		// console.log(res, "response at line 19");
		// if (res.ok) {
		// 	const user = await res.json()
		// 	console.log(user, "user at line 22 ");
		// 	return user
		// }
		// return null
		return null
	},
});

export default defineConfig({
	providers: [
		CustomJWTProvider,
	],
	// session: {
	// 	strategy: 'jwt'
	// },
	pages: {
		signIn: '/auth/login',
	},
	secret: import.meta.env.AUTH_SECRET,
	// callbacks: {
	// 	async jwt({ token, user }) {
	// 		// console.log(user, "user");
	// 		// console.log(token, "token")
	// 		if (user) {
	// 			token.accessToken = user.token
	// 		}
	// 		return token
	// 	},
	// 	async session({ session, token }) {
	// 		// console.log(token, "token at line 44");
	// 		// console.log(session, "session");
	// 		session.accessToken = token.accessToken
	// 		return session
	// 	}
	// },
	trustHost: true
})
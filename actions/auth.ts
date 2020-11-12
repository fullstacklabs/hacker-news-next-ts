import { Store } from "use-global-hook"
import { InitialState, MyAssociatedActions, User, Login } from "../common/types"

const baseURL = "http://localhost:3001"

export const logout = () => {
	localStorage.removeItem("userId")
}

export const login = async (
	store: Store<InitialState, MyAssociatedActions>,
	login: Login
) => {
	store.setState({
		...store.state,
		userLoading: true,
		userError: null,
	})

	try {
		const res = await fetch(`${baseURL}/user?email=${login.email}`, {
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
		})

		const resJson = await res.json()

		let loginSuccess = false

		if (resJson && resJson.length) {
			let resUser = resJson[0]

			if (resUser.password === login.password) {
				loginSuccess = true

				localStorage.setItem("userId", resUser.id)

				store.setState({
					...store.state,
					userLoading: false,
					userError: null,
					userId: resUser.id,
				})
			}
		}

		if (!loginSuccess)
			store.setState({
				...store.state,
				userLoading: false,
				userError: "Unable to login. Please try again.",
			})
	} catch (error) {
		store.setState({
			...store.state,
			userLoading: false,
			userError: error,
		})
	}
}

export const register = async (
	store: Store<InitialState, MyAssociatedActions>,
	user: User
) => {
	store.setState({
		...store.state,
		userLoading: true,
		userError: null,
	})

	try {
		const res = await fetch(`${baseURL}/user`, {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})

		const resJson = await res.json()

		localStorage.setItem("userId", resJson.id)

		store.setState({
			...store.state,
			userLoading: false,
			userError: null,
			userId: resJson.id,
		})
	} catch (error) {
		store.setState({
			...store.state,
			userLoading: false,
			userError: error,
		})

		console.error(error)
	}
}

export const checkAuth = (store: Store<InitialState, MyAssociatedActions>) => {
	const userId = localStorage.getItem("userId")

	if (userId)
		store.setState({
			...store.state,
			userId: parseInt(userId, 10),
		})
}

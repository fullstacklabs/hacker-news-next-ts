import { Store } from "use-global-hook"
import { InitialState, MyAssociatedActions, User } from "../common/types"

const baseURL = "http://localhost:3001"

const logout = () => {
	localStorage.removeItem("userId")
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

import { FC, createContext, useState, useEffect } from "react"
import { User } from "./types"
import Cookies from "js-cookie"

interface UserContextValues {
	user: User | null
	login: (user: User) => void
	logout: () => void
}

const UserContext = createContext<UserContextValues>({
	user: null,
	login: (user: User) => {},
	logout: () => {},
})

const UserContextProvider: FC = ({ children }) => {
	const [user, setUser] = useState<null | User>(null)

	useEffect(() => {
		let userString = Cookies.get("user")
		if (userString) setUser(JSON.parse(userString))
	}, [])

	const login = (loginUser: User) => {
		Cookies.set("user", JSON.stringify(loginUser), { expires: 7 })
		setUser(loginUser)
	}

	const logout = () => {
		setUser(null)
		Cookies.remove("user")
	}

	const value = {
		user,
		login,
		logout,
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const UserContextConsumer = UserContext.Consumer

export { UserContext, UserContextProvider, UserContextConsumer }

import { useState, useEffect, useContext, useCallback } from "react"
import styled from "styled-components"
import { UserContext } from "../../common/UserContext"
import NavigationItem from "../NavigationItem"

const Nav = styled.nav`
	flex: 1 0;
	display: flex;
	align-items: center;
	justify-content: flex-start;
`

const RightNav = styled.div`
	margin-left: auto;
`

const Navigation: React.FC = () => {
	const [isClient, setIsClient] = useState(false)
	const { user, logout } = useContext(UserContext)

	useEffect(() => {
		if (typeof window !== "undefined") setIsClient(true)
	}, [])

	const logoutHandler = useCallback(() => {
		logout()
	}, [])

	const isAuthenticated = !!user && isClient

	return (
		<Nav>
			<div>
				<NavigationItem href="/">news</NavigationItem>

				{isAuthenticated && (
					<NavigationItem href="/addNews">Add new</NavigationItem>
				)}
			</div>

			<RightNav>
				{isAuthenticated && (
					<>
						<NavigationItem href="/user">profile</NavigationItem>
						<NavigationItem onClick={logoutHandler}>logout</NavigationItem>
					</>
				)}
				{!isAuthenticated && (
					<>
						<NavigationItem href="/login">login</NavigationItem>
						<NavigationItem href="/register">register</NavigationItem>
					</>
				)}
			</RightNav>
		</Nav>
	)
}

export default Navigation

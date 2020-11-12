import { useCallback } from "react"
import styled from "styled-components"
import { useGlobal } from "../../store"
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
	const [state, actions] = useGlobal()
	const logoutHandler = useCallback(() => {
		actions.logout()
	}, [])

	const isAuthenticated = !!state.userId

	return (
		<Nav>
			<div>
				<NavigationItem href="/">new</NavigationItem>
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

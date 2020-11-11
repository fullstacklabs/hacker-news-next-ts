import styled from "styled-components"
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
	return (
		<Nav>
			<div>
				<NavigationItem href="/">new</NavigationItem>
			</div>

			<RightNav>
				<NavigationItem href="/register">register</NavigationItem>
			</RightNav>
		</Nav>
	)
}

export default Navigation

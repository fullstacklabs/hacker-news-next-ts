import styled from "styled-components"
import NavigationItem from "../NavigationItem"

const Nav = styled.nav``

const Navigation: React.FC = () => {
	return (
		<Nav>
			<NavigationItem href="/">new</NavigationItem>
		</Nav>
	)
}

export default Navigation

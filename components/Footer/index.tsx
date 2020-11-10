import styled from "styled-components"
import NavigationItem from "../NavigationItem"

const StyledFooter = styled.footer`
	border-top: 2px solid #ff6600;
	padding: 15px;
	text-align: center;

	&& a {
		font-size: 0.8rem;
	}
`

const Footer: React.FC = () => {
	return (
		<StyledFooter>
			<NavigationItem href="/">Guidelines</NavigationItem>
			<NavigationItem href="/">FAQ</NavigationItem>
			<NavigationItem href="/">Lists</NavigationItem>
			<NavigationItem href="/">API</NavigationItem>
			<NavigationItem href="/">Security</NavigationItem>
			<NavigationItem href="/">Legal</NavigationItem>
			<NavigationItem href="/">Apply to YC</NavigationItem>
			<NavigationItem href="/">Contact</NavigationItem>
		</StyledFooter>
	)
}

export default Footer

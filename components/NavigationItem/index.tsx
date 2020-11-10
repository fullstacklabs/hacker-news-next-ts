import Link from "next/link"
import styled from "styled-components"

const NavItem = styled.div`
	display: inline-block;

	a {
		display: inline-block;
		margin: 0 5px;
		color: #000;
		text-decoration: none;
	}

	&:not(:last-child):after {
		content: "|";
		display: inline-block;
		margin: 0 5px;
	}
`

interface NavigationItemProps {
	href: string
	children: React.ReactNode
}

const NavigationItem: React.FC<NavigationItemProps> = ({ href, children }) => {
	return (
		<NavItem>
			<Link href={href}>
				<a>{children}</a>
			</Link>
		</NavItem>
	)
}

export default NavigationItem

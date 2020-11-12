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
	href?: string
	onClick?: () => void
	children: React.ReactNode
}

const NavigationItem: React.FC<NavigationItemProps> = ({
	href,
	onClick,
	children,
}) => {
	let link: React.ReactNode = null

	if (href)
		link = (
			<Link href={href}>
				<a>{children}</a>
			</Link>
		)
	else if (onClick) link = <a onClick={onClick}>{children}</a>

	return <NavItem>{link}</NavItem>
}

export default NavigationItem

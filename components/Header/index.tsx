import Link from "next/link"
import styled from "styled-components"
import Navigation from "../Navigation"

const HeaderDiv = styled.div`
	display: flex;
	align-items: center;
	padding: 2px;
	background: ${({ theme }) => theme.colors.primary}; ;
`

const Logo = styled.img`
	border: solid 1px #fff;
	margin-right: 5px;
	width: 18px;
	height: 18px;
	font-size: 0;
`

const Title = styled.h1`
	margin: 0 10px 0 0;
	font-size: 1rem;
`

// next/link doesn't apply hrefs to styled a tags

const OuterLink = styled.div`
	a {
		display: flex;
		align-items: center;
		font-size: 0;
		text-decoration: none;
		color: #000;
	}
`

const Header: React.FC = () => {
	return (
		<HeaderDiv>
			<OuterLink>
				<Link href="/">
					<a>
						<Logo src="/y18.gif" alt="Logo" />
						<Title>Hacker News</Title>
					</a>
				</Link>
			</OuterLink>
			<Navigation />
		</HeaderDiv>
	)
}

export default Header

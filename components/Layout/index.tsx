import styled from "styled-components"
import Header from "../Header"
import Footer from "../Footer"

const Wrapper = styled.div`
	width: 85%;
	margin: 0 auto;
	background: #f6f6ef;

	@media only screen and (max-width: 750px) {
		width: auto;
	}
`

interface ChildrenProp {
	children: React.ReactNode
}

const Layout: React.FC<ChildrenProp> = ({ children }) => {
	return (
		<Wrapper>
			<Header />
			{children}
			<Footer />
		</Wrapper>
	)
}

export default Layout

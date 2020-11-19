import { AppProps } from "next/app"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { UserContextProvider } from "../common/UserContext"
import Layout from "../components/Layout"

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
		box-sizing: border-box;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	}
	
	a:link {
    color: #000000;
	}

	*, *:before, *:after {
		box-sizing: border-box;
	}
`

const theme = {
	colors: {
		primary: "#ff6600",
		secondary: "#828282",
	},
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Hacker News</title>
			</Head>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<UserContextProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</UserContextProvider>
			</ThemeProvider>
		</>
	)
}

import { useEffect } from "react"
import { AppProps } from "next/app"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import Layout from "../components/Layout"
import { useGlobal } from "../store"

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
	const [, actions] = useGlobal()

	useEffect(() => {
		if (typeof window !== "undefined") actions.checkAuth()
	}, [])

	return (
		<>
			<Head>
				<title>Hacker News</title>
			</Head>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>
	)
}

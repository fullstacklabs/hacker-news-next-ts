import { AppProps } from "next/app"
import { createGlobalStyle, ThemeProvider } from "styled-components"
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
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</>
	)
}

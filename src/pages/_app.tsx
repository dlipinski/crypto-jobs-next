import React from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '../app/store'
import { NextUIProvider } from '@nextui-org/react'
import Layout from '../components/layout'
import { SSRProvider } from '@react-aria/ssr'
import { createTheme } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const lightTheme = createTheme({
	type: 'light'
})

const darkTheme = createTheme({
	type: 'dark'
})

const MyApp = ({ Component, pageProps }: AppProps) =>
	<SSRProvider>
		<Provider store={store}>
			<NextThemesProvider
				defaultTheme="system"
				attribute="class"
				value={{
					light: lightTheme.className,
					dark: darkTheme.className
				}}
			>
				<NextUIProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</NextUIProvider>
			</NextThemesProvider>
		</Provider>
	</SSRProvider>

export default MyApp

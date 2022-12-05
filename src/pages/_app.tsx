import React from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { store } from '../app/store'
import { NextUIProvider } from '@nextui-org/react'
import Layout from '../components/layout'
import { SSRProvider } from '@react-aria/ssr'
const MyApp = ({ Component, pageProps }: AppProps) =>
	<SSRProvider>
		<Provider store={store}>
			<NextUIProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</NextUIProvider>
		</Provider>
	</SSRProvider>

export default MyApp

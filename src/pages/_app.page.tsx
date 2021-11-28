import { Box, Center, ChakraProvider, Flex, Image } from "@chakra-ui/react"
import NextLink from 'next/link'
import { useEffect } from "react"
import { Provider } from 'react-redux'
import { theme } from "../configs/chakraui"
import { routes } from "../configs/routes"
import { actions as walletActions } from "../redux/features/wallets"
import { store, useAppDispatch } from "../redux/store"
import "../styles/globals.scss"

export default ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<App Component={Component} pageProps={pageProps} />
			</Provider>
		</ChakraProvider>
	)
}

const App = ({ Component, pageProps }) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(walletActions.getAll())
	}, [])

	return (
		<>
			<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css" rel="stylesheet" type="text/css" />

			<Flex h="100vh">
				<Flex w="80px" bg="white" boxShadow="lg" zIndex="20" direction="column" alignItems="center" py="4">
					<Box mx="4" mb="8">
						<Image borderRadius="md" src="/images/wadd_logo.png" />
					</Box>
					<Box flex="1" w="100%">
						{routes.primary.map(route => (
							<NextLink href={route.path} key={route.path}>
								<Center color="gray.500" bg="white" h="45px" mx="4" mb="4" borderRadius="md">
									<i className={route.icon}></i>
								</Center>
							</NextLink>
						))}
					</Box>
					<Box w="100%">
						{routes.secondary.map(route => (
							<NextLink href={route.path} key={route.path}>
								<Center color="gray.500" bg="white" h="45px" mx="4" mb="4" borderRadius="md">
									<i className={route.icon}></i>
								</Center>
							</NextLink>
						))}
					</Box>
				</Flex>
				<Box flex="1" bg="gray.50" zIndex="10" py="4" px="8">
					<Component {...pageProps} />
				</Box>
			</Flex>
		</>
	)
}

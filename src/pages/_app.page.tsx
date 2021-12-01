import { Box, Center, ChakraProvider, Flex, Image, theme } from "@chakra-ui/react"
import NextLink from 'next/link'
import { useEffect } from "react"
import { Provider as ReduxProvider } from 'react-redux'
import { store, useAppDispatch } from "@wadd/redux/store"
import "@wadd/styles/globals.scss"
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import { auth0 } from "@wadd/configs/auth0"
import { routes } from "@wadd/configs/routes"
import { sessionStore, walletsStore, categoriesStore } from "@wadd/redux/features"


export default ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Auth0Provider {...auth0}>
				<ReduxProvider store={store}>
					<App Component={Component} pageProps={pageProps} />
				</ReduxProvider>
			</Auth0Provider>
		</ChakraProvider>
	)
}

const App = ({ Component, pageProps }) => {
	const dispatch = useAppDispatch()
	const { user, isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0()

	useEffect(() => {
		if (isAuthenticated) {
			console.log({ user })
			dispatch(sessionStore.actions.setUser(user))

			dispatch(walletsStore.actions.getAll())
			dispatch(categoriesStore.actions.getAll())
		}
	}, [isAuthenticated])

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			loginWithRedirect()
		}
	}, [isLoading])

	if (isLoading || !isAuthenticated) {
		return <h1>loading...</h1>
	}

	return (
		<>
			<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css" rel="stylesheet" type="text/css" />

			<Flex h="100vh">
				<Flex w="80px" bg="white" boxShadow="lg" zIndex="20" direction="column" alignItems="center" py="6">
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
						<Center color="gray.500" bg="white" h="45px" mx="4" mb="4" borderRadius="md" onClick={() => logout({ returnTo: "http://ubuntu-vm:3000/app/transactions" })}>
							<i className="fad fa-sign-out"></i>
						</Center>
					</Box>
				</Flex>
				<Box flex="1" bg="gray.50" zIndex="10">
					<Component {...pageProps} />
				</Box>
			</Flex>
		</>
	)
}

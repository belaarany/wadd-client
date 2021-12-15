import { Box, Center, ChakraProvider, Flex, Image, Spinner } from "@chakra-ui/react"
import NextLink from "next/link"
import { useEffect } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { store, useAppDispatch } from "@wadd/redux/store"
import "@wadd/styles/globals.scss"
import { Auth0Provider } from "@auth0/auth0-react"
import { useAuth0 } from "@auth0/auth0-react"
import { auth0 } from "@wadd/configs/auth0"
import { routes } from "@wadd/configs/routes"
import { sessionStore, walletsStore, categoriesStore, transactionsStore } from "@wadd/redux/features"
import { theme } from "@wadd/configs/chakraui"
import ActiveLink from "@wadd/components/ActiveLink"

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
			dispatch(sessionStore.actions.setUser(user))

			dispatch(walletsStore.actions.getAll({}))
			dispatch(categoriesStore.actions.getAll({}))
		}
	}, [isAuthenticated])

	useEffect(() => {
		if (!isLoading && !isAuthenticated) {
			loginWithRedirect()
		}
	}, [isLoading])

	if (isLoading || !isAuthenticated) {
		return (
			<Center h="100vh">
				<Spinner />
			</Center>
		)
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
						{routes.primary.map((route) => (
							<ActiveLink
								href={route.path}
								key={route.path}
								as={Center}
								color="gray.500"
								bg="white"
								h="45px"
								mx="4"
								mb="4"
								borderRadius="md"
								cursor="pointer"
								_hover={{
									bg: "gray.100",
									// color: "brand.500",
								}}
								activeProps={{
									bg: "brand.50",
									color: "brand.500",
								}}
							>
								<i className={route.icon}></i>
							</ActiveLink>
						))}
					</Box>
					<Box w="100%">
						{routes.secondary.map((route) => (
							<ActiveLink
								href={route.path}
								key={route.path}
								as={Center}
								color="gray.500"
								bg="white"
								h="45px"
								mx="4"
								mb="4"
								borderRadius="md"
								cursor="pointer"
								_hover={{
									bg: "gray.100",
									// color: "brand.500",
								}}
								activeProps={{
									bg: "brand.50",
									color: "brand.500",
								}}
							>
								<i className={route.icon}></i>
							</ActiveLink>
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

import { Box, Center, ChakraProvider, Flex, Image, Link } from "@chakra-ui/react"
import { Provider } from 'react-redux'
import { theme } from "../configs/chakraui"
import { store } from "../redux/store"
import "../styles/globals.scss"
import { routes } from "../configs/routes"
import NextLink from 'next/link'


export default ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css" rel="stylesheet" type="text/css" />

				<Flex h="100vh">
					<Flex w="80px" bg="white" boxShadow="lg" zIndex="20" direction="column" alignItems="center" py="4">
						<Box mx="4" mb="8">
							<Image borderRadius="md" src="/images/wadd_logo.png" />
						</Box>
						<Box flex="1" w="100%">
							{routes.primary.map(route => (
								<NextLink href={route.path}>
									<Center color="gray.500" bg="white" h="45px" mx="4" mb="4" borderRadius="md">
										<i className={route.icon}></i>
									</Center>
								</NextLink>
							))}
						</Box>
						<Box w="100%">
							{routes.secondary.map(route => (
								<NextLink href={route.path}>
									<Center color="gray.500" bg="white" h="45px" mx="4" mb="4" borderRadius="md">
										<i className={route.icon}></i>
									</Center>
								</NextLink>
							))}
						</Box>
					</Flex>
					{/* <Box bg="gray.50" w="250px" borderRight="1px" borderRightColor="gray.200" zIndex="10">
					right

				</Box> */}
					<Box flex="1" bg="gray.50" zIndex="10" py="4" px="8">
						<Component {...pageProps} />
					</Box>
				</Flex>

			</Provider>

		</ChakraProvider>
	)
}

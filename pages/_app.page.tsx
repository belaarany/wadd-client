import { ChakraProvider } from "@chakra-ui/react"
import "../styles/globals.scss"
import Link from 'next/link'

import { store } from '../redux/store'
import { Provider } from 'react-redux'


import { Flex, Spacer, Box, Image, Center } from "@chakra-ui/react"


import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
	fonts: {
		heading: "Quicksand",
		body: "Quicksand",
	},
	colors: {
		brand: {
			50: "#e8e6fe",
			100: "#c6c1fe",
			200: "#afa8fd",
			300: "#a39bfd",
			400: "#988ffc",
			500: "#8c82fc",
			600: "#7e75e3",
			700: "#7068ca",
			800: "#544e97",
			900: "#383465",
		},
	},
	components: {
	},

})


function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>

				<link href="https://cdn.jsdelivr.net/gh/hung1001/font-awesome-pro@4cac1a6/css/all.css" rel="stylesheet" type="text/css" />

				<Flex h="100vh">
					<Flex w="80px" bg="white" boxShadow="lg" zIndex="20" direction="column" alignItems="center" py="4">
						<Box mx="4" mb="8">
							<Image borderRadius="md" src="https://gitlab.com/uploads/-/system/group/avatar/12597004/001702_20210702112759.png" />
						</Box>
						<Box flex="1" w="100%">
							<Center color="brand.500" bg="brand.50" h="45px" mx="4" mb="4" borderRadius="md">
								<i className="fad fa-exchange"></i>
							</Center>
							<Center color="gray.500" bg="white" h="50px" mx="4" mb="4" borderRadius="md">
								<i className="fad fa-analytics"></i>
							</Center>
							<Center color="gray.500" bg="white" h="50px" mx="4" mb="4" borderRadius="md">
								<i className="fad fa-chart-pie-alt"></i>
							</Center>
						</Box>
						<Box w="100%">
							<Center color="gray.500" bg="white" h="50px" mx="4" mb="4" borderRadius="md">
								<i className="fad fa-cog"></i>
							</Center>
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

export default MyApp

import { Box } from "@chakra-ui/react"

export default ({ children }) => {
	return (
		<Box w="300px" p="8" borderRight="1px" borderRightColor="gray.200">
			{children}
		</Box>
	)
}

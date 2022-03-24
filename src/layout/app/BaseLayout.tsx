import { Flex } from "@chakra-ui/react"

export default ({ children }) => {
	return (
		<Flex h="100%" w="full" flexDir="column">
			<Flex maxH="100%" grow="1">
				{children}
			</Flex>
		</Flex>
	)
}

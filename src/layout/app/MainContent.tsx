import { Flex } from "@chakra-ui/react"

export default ({ children }) => {
	return (
		<Flex grow="1" flexDirection="column" _bg="white" px="8" py="6">
			{children}
		</Flex>
	)
}

import { Avatar, Box, Button, Center, Container, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Table, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"

export default ({ header, action, children}: any) => {
	return (
		<>
			<Flex py="4" px="0" _borderBottom='1px' bg="gray.50" borderBottomColor="gray.200" alignItems="center">
				<Heading size="md">{header}</Heading>
				<Spacer />
				{action}
			</Flex>
			<Box bg="white" _p="6" borderRadius="lg" boxShadow="base" _border="1px" borderColor="gray.200" overflow="hidden">
				{children}
			</Box>
		</>
	)
}

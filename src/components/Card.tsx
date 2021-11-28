import { Avatar, Box, Button, Center, Container, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Table, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"

export default ({ header, action, children }: any) => {
	return (
		<>
			{(header || action) && (
				<Flex py="4" px="0" bg="gray.50" alignItems="center">
					<Heading size="md">{header}</Heading>
					<Spacer />
					{action}
				</Flex>
			)}
			<Box bg="white" borderRadius="lg" boxShadow="base" borderColor="gray.200" overflow="hidden">
				{children}
			</Box>
		</>
	)
}

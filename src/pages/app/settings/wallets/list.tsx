import { Avatar, Box, Button, Center, Container, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { Card } from "@wadd/components"
import { Wallet } from "@wadd/models/wallet"
import { walletsStore } from "@wadd/redux/features"
import { useAppDispatch, useAppSelector } from "@wadd/redux/store"
import React, { useState } from "react"
import WalletModal from "./modal"

export default () => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const wallets = useAppSelector(walletsStore.selectors.selectAll)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [editWallet, setEditWallet] = useState(null)

	const onAddWalletClick = () => {
		setEditWallet(null)
		onOpen()
	}

	const onEditWalletClick = (wallet: Wallet) => {
		setEditWallet(wallet)
		onOpen()
	}

	const onDeleteWalletClick = (wallet: Wallet) => {
		dispatch(walletsStore.actions.delete(wallet.id))

		toast({
			title: "Wallet deleted",
			status: "success",
			duration: 3000,
			isClosable: true,
		})
	}

	return (
		<>
			<Container maxW="container.lg">
				<Card header="Wallets" action={<Button colorScheme="brand" onClick={onAddWalletClick}>Add Wallet</Button>}>
					<Table variant="simple">
						<Thead>
							<Tr>
								<Th>Wallet</Th>
								<Th>Type</Th>
								<Th>Default Currency</Th>
								<Th>Initial Balance</Th>
								<Th w="1%"></Th>
							</Tr>
						</Thead>
						<Tbody>
							{wallets.map((wallet) => (
								<Tr key={wallet.id}>
									<Td>
										<Flex alignItems="center">
											<Avatar name={wallet.name} src={wallet.icon_url} size="sm" mr="3" />
											<Box>{wallet.name}</Box>
										</Flex>
									</Td>
									<Td><Tag>{wallet.type}</Tag></Td>
									<Td><Tag>{wallet.default_currency}</Tag></Td>
									<Td fontFamily="mono">{wallet.initial_balance} {wallet.default_currency}</Td>
									<Td>
										<Menu>
											<MenuButton as={IconButton} size="sm" aria-label="Options" icon={<i className="far fa-ellipsis-h"></i>}></MenuButton>
											<MenuList>
												<MenuItem icon={<Center w="20px"><i className="far fa-pen"></i></Center>} onClick={onEditWalletClick.bind(null, wallet)}>Edit</MenuItem>
												<MenuItem icon={<Center w="20px"><i className="far fa-trash"></i></Center>} onClick={onDeleteWalletClick.bind(null, wallet)}>Delete</MenuItem>
											</MenuList>
										</Menu>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Card>
			</Container>

			<WalletModal isOpen={isOpen} onClose={onClose} isNew={!editWallet} wallet={editWallet} />
		</>
	)
}

import { Avatar, Box, Button, Center, Container, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Table, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Wallet } from "../../../../interfaces/models/wallet"
import { actions, selectors } from "../../../../redux/features/categories"
import { useAppDispatch } from "../../../../redux/store"
import CategoryModal from "./modal"
import { Card } from "../../../../components"
import { Category } from "../../../../interfaces/models/category"

export default () => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const categories = useSelector(selectors.selectAll)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [editCategory, setEditCategory] = useState(null)

	useEffect(() => {
		dispatch(actions.getAll())
	}, [])

	const onAddCategoryClick = () => {
		setEditCategory(null)
		onOpen()
	}

	const onEditCategoryClick = (category: Category) => {
		setEditCategory(category)
		onOpen()
	}

	const onDeleteCategoryClick = (category: Category) => {
		dispatch(actions.delete(category.id))

		toast({
			title: "Category deleted",
			status: "success",
			duration: 3000,
			isClosable: true,
		})
	}

	return (
		<>
			<Container maxW="container.lg">
				<Card header="Categories" action={<Button colorScheme="brand" onClick={onAddCategoryClick}>Add Category</Button>}>
					<Table>
						<Thead>
							<Tr>
								<Th>Category</Th>
								<Th w="1%"></Th>
							</Tr>
						</Thead>
						<Tbody>
							{categories.map((category) => (
								<Tr>
									<Td>
										<Flex alignItems="center">
											{/* <Avatar name={category.name} src={category.icon_url} size="sm" mr="2" /> */}
											<Box>{category.name}</Box>
										</Flex>
									</Td>
									<Td>
										<Menu>
											<MenuButton as={IconButton} size="sm" aria-label="Options" icon={<i className="far fa-ellipsis-h"></i>}></MenuButton>
											<MenuList>
												<MenuItem icon={<Center w="20px"><i className="far fa-pen"></i></Center>} onClick={onEditCategoryClick.bind(null, category)}>Edit</MenuItem>
												<MenuItem icon={<Center w="20px"><i className="far fa-archive"></i></Center>}>Archive</MenuItem>
												<MenuItem icon={<Center w="20px"><i className="far fa-trash"></i></Center>} onClick={onDeleteCategoryClick.bind(null, category)}>Delete</MenuItem>
											</MenuList>
										</Menu>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</Card>
			</Container>

			<CategoryModal isOpen={isOpen} onClose={onClose} isNew={!editCategory} category={editCategory} />
		</>
	)
}

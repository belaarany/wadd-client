import { Box, Button, Center, Container, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, Tag, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react"
import { Card, CategoryIcon } from "@wadd/components"
import { Category } from "@wadd/models/category"
import { categoriesStore } from "@wadd/redux/features"
import { useAppDispatch, useAppSelector } from "@wadd/redux/store"
import React, { useState } from "react"
import CategoryModal from "./modal"

export default () => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const categories = useAppSelector(categoriesStore.selectors.selectAll)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [editCategory, setEditCategory] = useState(null)
	const onAddCategoryClick = () => {
		setEditCategory(null)
		onOpen()
	}

	const onEditCategoryClick = (category: Category) => {
		setEditCategory(category)
		onOpen()
	}

	const onDeleteCategoryClick = (category: Category) => {
		dispatch(categoriesStore.actions.delete(category.id))

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
				<Card header="Income Categories" action={<Button colorScheme="brand" onClick={onAddCategoryClick}>Add Category</Button>}>
					<Table>
						<Thead>
							<Tr>
								<Th>Category</Th>
								<Th>Type</Th>
								<Th w="1%"></Th>
							</Tr>
						</Thead>
						<Tbody>
							{categories.map((category) => (
								<Tr key={category.id}>
									<Td>
										<Flex alignItems="center">
											<CategoryIcon colorHex={category.color_hex} iconFa={category.icon_fa} mr="3" />
											<Box>{category.name}</Box>
										</Flex>
									</Td>
									<Td>
										<Tag colorScheme={category.type === "income" ? "green" : "red"}>{category.type.toUpperCase()}</Tag>
									</Td>
									<Td>
										<Menu>
											<MenuButton as={IconButton} size="sm" aria-label="Options" icon={<i className="far fa-ellipsis-h"></i>}></MenuButton>
											<MenuList>
												<MenuItem icon={<Center w="20px"><i className="far fa-pen"></i></Center>} onClick={onEditCategoryClick.bind(null, category)}>Edit</MenuItem>
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

import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Heading, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Currency } from "../../../interfaces/enums/currency";
import { WalletType } from "../../../interfaces/enums/wallet-type";
import { actions } from "../../../redux/features/categories";
import { useAppDispatch } from "../../../redux/store";
import { useToast } from "@chakra-ui/react"


export default ({ isNew, category, isOpen, onClose }) => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const { register, handleSubmit, setValue } = useForm();

	useEffect(() => {
		if (isOpen) {
			setValue("name", category?.name || "")
		}
	}, [isOpen])

	const onSubmit = data => {
		if (isNew) {
			dispatch(actions.create({
				parent_category_id: null,
				owner_user_id: null,
				name: data.name,
			}))

			onClose()

			toast({
				title: "Category created",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
		}
		else {
			dispatch(actions.update({
				id: category.id,
				name: data.name,
			}))

			onClose()

			toast({
				title: "Category updated",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isNew ? "Create" : "Edit"} Category</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<form id="form" onSubmit={handleSubmit(onSubmit)}>
							<Heading size="md" mb="6">General</Heading>

							<FormControl id="name" isRequired mb="6">
								<FormLabel>Name</FormLabel>
								<Input {...register("name")} />
							</FormControl>
						</form>
					</ModalBody>

					<ModalFooter>
						<Button variant="ghost" mr={3} onClick={onClose}>Close</Button>
						<Button colorScheme="brand" type="submit" form="form">{isNew ? "Create" : "Update"}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

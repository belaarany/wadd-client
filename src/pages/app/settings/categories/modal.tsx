import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Heading, Divider } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { useToast } from "@chakra-ui/react"
import SelectWithIcon from "@wadd/components/SelectWithIcon"
import { CategoryIcon } from "@wadd/components"
import { getTypeOptions } from "@wadd/utils/getTypeOptions"
import { categoriesStore } from "@wadd/redux/features"
import { useAppDispatch } from "@wadd/redux/store"
import { useApiState } from "@wadd/utils/useApiState"

export default ({ isNew, category, isOpen, onClose }) => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const { register, handleSubmit, setValue, control } = useForm()
	const { state: apiState, onChange: onApiStateChange } = useApiState("categories")

	useEffect(() => {
		if (isOpen) {
			setValue("name", category?.name || "")
			setValue("type", category?.type || "")
			setValue("color_hex", category?.color_hex || "")
			setValue("icon_fa", category?.icon_fa || "")
		}
	}, [isOpen])

	onApiStateChange((prev, state) => {
		if ((prev?.operation === "create" || prev?.operation === "update") && state.status === "idle") {
			if (!state.error) {
				onClose()

				toast({
					title: `Category ${isNew ? "created" : "updated"}`,
					status: "success",
					duration: 3000,
				})
			} else {
				toast({
					title: "Error occurred",
					status: "error",
					duration: 3000,
				})
			}
		}
	})

	const onSubmit = (data) => {
		if (isNew) {
			dispatch(
				categoriesStore.actions.create({
					parent_category_id: null,
					owner_user_id: null,
					name: data.name,
					color_hex: data.color_hex,
					icon_fa: data.icon_fa,
					type: data.type,
				}),
			)
		} else {
			dispatch(
				categoriesStore.actions.update({
					id: category.id,
					name: data.name,
					color_hex: data.color_hex,
					icon_fa: data.icon_fa,
					type: data.type,
				}),
			)
		}
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isNew ? "Create" : "Edit"} Category</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<form id="form" onSubmit={handleSubmit(onSubmit)}>
							<Heading size="md" mb="6">
								General
							</Heading>

							<FormControl id="name" isRequired mb="6">
								<FormLabel>Name</FormLabel>
								<Input {...register("name")} />
							</FormControl>

							<FormControl id="type" isRequired mb="6">
								<FormLabel>Type</FormLabel>
								{/* <SelectWithIcon
									id="type"
									isFilterable={false}
									items={getTypeOptions("income", "expense")}
									icon={(item) => <CategoryIcon colorHex={item.colorHex} iconFa={item.iconFa} mr="0" />}
									onChange={onTypeChange}
									defaultValue={category?.type}
								/> */}
								<Controller
									name="type"
									control={control}
									render={({ field }) => (
										<SelectWithIcon
											id="type"
											isFilterable={false}
											items={getTypeOptions("income", "expense")}
											icon={(item) => <CategoryIcon colorHex={item.colorHex} iconFa={item.iconFa} mr="0" />}
											onChange={field.onChange}
											selected={field.value}
										/>
									)}
								/>
							</FormControl>

							<Divider mb="6" />

							<Heading size="md" mb="6">
								Appearence
							</Heading>

							<FormControl id="color_hex" isRequired mb="6">
								<FormLabel>Color (HEX)</FormLabel>
								<Input {...register("color_hex")} />
							</FormControl>

							<FormControl id="icon_fa" isRequired mb="6">
								<FormLabel>Icon Font Awesome Name</FormLabel>
								<Input {...register("icon_fa")} />
							</FormControl>
						</form>
					</ModalBody>

					<ModalFooter>
						<Button disabled={apiState?.status === "pending"} variant="ghost" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button isLoading={apiState?.status === "pending"} colorScheme="brand" type="submit" form="form">
							{isNew ? "Create" : "Update"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

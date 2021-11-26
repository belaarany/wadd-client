import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Heading, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Currency } from "../../../interfaces/enums/currency";
import { WalletType } from "../../../interfaces/enums/wallet-type";
import { actions } from "../../../redux/features/wallets";
import { useAppDispatch } from "../../../redux/store";
import { useToast } from "@chakra-ui/react"


export default ({ isNew, wallet, isOpen, onClose }) => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const { register, handleSubmit, setValue } = useForm();

	useEffect(() => {
		if (isOpen) {
			setValue("name", wallet?.name || "")
			setValue("initial_balance", wallet?.initial_balance || 0)
			setValue("color_hex", wallet?.color_hex || "")
			setValue("icon_url", wallet?.icon_url || "")
		}
	}, [isOpen])

	const onSubmit = data => {
		if (isNew) {
			dispatch(actions.create({
				name: data.name,
				order: 1,
				owner_user_id: null,
				initial_balance: data.initial_balance,
				default_currency: Currency.HUF,
				type: WalletType.CASH,
				color_hex: data.color_hex,
				icon_url: data.icon_url,
			}))

			onClose()

			toast({
				title: "Wallet created",
				status: "success",
				duration: 3000,
				isClosable: true,
			})
		}
		else {
			dispatch(actions.update({
				id: wallet.id,
				name: data.name,
				initial_balance: data.initial_balance,
				color_hex: data.color_hex,
				icon_url: data.icon_url,
			}))

			onClose()

			toast({
				title: "Wallet updated",
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
					<ModalHeader>{isNew ? "Create" : "Edit"} Wallet</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<form id="form" onSubmit={handleSubmit(onSubmit)}>
							<Heading size="md" mb="6">General</Heading>

							<FormControl id="name" isRequired mb="6">
								<FormLabel>Name</FormLabel>
								<Input {...register("name")} />
							</FormControl>

							<FormControl id="initial_balance" isRequired mb="6">
								<FormLabel>Initial Balance</FormLabel>
								<Input {...register("initial_balance")} type="number" />
							</FormControl>

							<Divider mb="6" />

							<Heading size="md" mb="6">Appearence</Heading>

							<FormControl id="color_hex" isRequired mb="6">
								<FormLabel>Color (HEX)</FormLabel>
								<Input {...register("color_hex")} />
							</FormControl>

							<FormControl id="icon_url" isRequired mb="6">
								<FormLabel>Icon URL</FormLabel>
								<Input {...register("icon_url")} />
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

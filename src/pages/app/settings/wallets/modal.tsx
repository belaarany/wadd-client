import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Heading, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Currency } from "../../../../interfaces/enums/currency";
import { WalletType } from "../../../../interfaces/enums/wallet-type";
import { actions, reducer } from "../../../../redux/features/wallets";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { useToast } from "@chakra-ui/react"
import { store } from "../../../../redux/store"
import { useSelector } from "react-redux";
import { useStateApi } from "../../../../utils/useStateApi";


export default ({ isNew, wallet, isOpen, onClose }) => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const { register, handleSubmit, setValue } = useForm();
	const { state: apiState, onChange: onApiStateChange } = useStateApi("wallets")

	useEffect(() => {
		if (isOpen) {
			setValue("name", wallet?.name || "")
			setValue("initial_balance", wallet?.initial_balance || 0)
			setValue("color_hex", wallet?.color_hex || "")
			setValue("icon_url", wallet?.icon_url || "")
		}
	}, [isOpen])

	onApiStateChange((prev, state) => {
		if (prev?.status && state.status === "idle") {
			if (!state.error) {
				onClose()

				toast({
					title: `Wallet ${isNew ? "created" : "updated"}`,
					status: "success",
					duration: 3000,
				})
			}
			else {
				toast({
					title: "Error occurred",
					status: "error",
					duration: 3000,
				})
			}
		}
	})

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
		}
		else {
			dispatch(actions.update({
				id: wallet.id,
				name: data.name,
				initial_balance: data.initial_balance,
				color_hex: data.color_hex,
				icon_url: data.icon_url,
			}))
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
						<Button disabled={apiState?.status === "pending"} variant="ghost" mr={3} onClick={onClose}>Close</Button>
						<Button isLoading={apiState?.status === "pending"} colorScheme="brand" type="submit" form="form">{isNew ? "Create" : "Update"}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

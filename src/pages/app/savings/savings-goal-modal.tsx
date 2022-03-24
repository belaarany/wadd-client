import { Button, Divider, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { Currency } from "@wadd/interfaces/enums/currency"
import { WalletType } from "@wadd/interfaces/enums/wallet-type"
import { SavingsGoal } from "@wadd/models/savings-goal"
import { savingsGoalsStore, walletsStore } from "@wadd/redux/features"
import { useAppDispatch } from "@wadd/redux/store"
import { useApiState } from "@wadd/utils/useApiState"
import React, { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

interface Props {
	savingsGoal: null | SavingsGoal
	isOpen: boolean
	onClose: () => void
}

const defaultProps: Props = {
	savingsGoal: null,
	isOpen: false,
	onClose: () => {}
}

export default (props: Props = defaultProps) => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const form = useForm()
	const apiState = useApiState("savingsGoals")
	const isNew = useMemo(() => !props.savingsGoal, [props.savingsGoal])

	useEffect(() => {
		if (props.isOpen) {
			// setValue("name", wallet?.name || "")
			// setValue("initial_balance", wallet?.initial_balance || 0)
			// setValue("color_hex", wallet?.color_hex || "")
			// setValue("icon_url", wallet?.icon_url || "")
		}
	}, [props.isOpen])

	apiState.onChange((prev, state) => {
		if ((prev?.operation === "create" || prev?.operation === "update") && state.status === "idle") {
			if (!state.error) {
				props.onClose()

				toast({
					title: `Savings Goal ${isNew ? "created" : "updated"}`,
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
				savingsGoalsStore.actions.create({
					name: data.name,
					owner_user_id: null,
					start_amount: 0,
					goal_amount: data.goal_amount,
					currency: Currency.HUF,
				}),
			)
		} else {
			// dispatch(
			// 	walletsStore.actions.update({
			// 		id: wallet.id,
			// 		name: data.name,
			// 		initial_balance: data.initial_balance,
			// 		color_hex: data.color_hex,
			// 		icon_url: data.icon_url,
			// 	}),
			// )
		}
	}

	return (
		<>
			<Modal isOpen={props.isOpen} onClose={props.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{isNew ? "Create" : "Edit"} Savings Goal</ModalHeader>
					<ModalCloseButton />

					<ModalBody>
						<form id="form" onSubmit={form.handleSubmit(onSubmit)}>
							<Heading size="md" mb="6">
								General
							</Heading>

							<FormControl id="name" isRequired mb="6">
								<FormLabel>Name</FormLabel>
								<Input {...form.register("name")} />
							</FormControl>

							<FormControl id="goal_amount" isRequired mb="6">
								<FormLabel>Goal Amount</FormLabel>
								<Input {...form.register("goal_amount")} type="number" />
							</FormControl>
						</form>
					</ModalBody>

					<ModalFooter>
						<Button disabled={apiState?.state.status === "pending"} variant="ghost" mr={3} onClick={props.onClose}>
							Close
						</Button>
						<Button isLoading={apiState?.state.status === "pending"} colorScheme="brand" type="submit" form="form">
							{isNew ? "Create" : "Update"}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

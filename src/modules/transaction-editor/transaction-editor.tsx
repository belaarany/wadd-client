import {
	useColorModeValue as t,
	Avatar,
	Box,
	Button,
	CloseButton,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Textarea,
	Stack,
	HStack,
	useToast,
	FormHelperText,
	Code,
	Divider,
	Center,
} from "@chakra-ui/react"
import { CategoryIcon } from "@wadd/components"
import SelectWithIcon from "@wadd/components/SelectWithIcon"
import { Currency } from "@wadd/interfaces/enums/currency"
import { categoriesStore, transactionsStore, walletsStore } from "@wadd/redux/features"
import { useAppDispatch, useAppSelector } from "@wadd/redux/store"
import { getTypeOptions } from "@wadd/utils/getTypeOptions"
import { useApiState } from "@wadd/utils/useApiState"
import React, { useEffect, useState, useRef, useMemo } from "react"
import { useForm, Controller } from "react-hook-form"
import { Transaction } from "@wadd/models/transaction"
import moment from "moment"

interface Props {
	transaction: null | Transaction
	onCloseClick: () => void
}

export default (props: Props) => {
	const toast = useToast()
	const dispatch = useAppDispatch()
	const wallets = useAppSelector(walletsStore.selectors.selectAll)
	const categories = useAppSelector(categoriesStore.selectors.selectAll)
	const { register, handleSubmit, reset, setValue, control } = useForm()
	const { state: apiState, onChange: onApiStateChange } = useApiState("transactions")
	const a = useRef()
	const isNew = useMemo(() => !props.transaction, [props.transaction])
	const apiCreating = useMemo(() => apiState?.operation === "create" && apiState?.status === "pending", [apiState])
	const apiUpdating = useMemo(() => apiState?.operation === "update" && apiState?.status === "pending", [apiState])

	onApiStateChange((prev, state) => {
		if (prev?.status && (prev.operation === "create" || prev.operation === "update") && state.status === "idle") {
			if (!state.error) {
				toast({
					title: `Transaction ${prev.operation === "create" ? "created" : "updated"}`,
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

	useEffect(() => {
		if (isNew) {
			resetForm()
		} else {
			setValue("timestamp", moment(props.transaction.timestamp).format("YYYY-MM-DD"))
			setValue("type", props.transaction.kind)
			setValue("wallet_id", props.transaction.wallet_id)
			setValue("category_id", props.transaction.category_id)
			setValue("amount", props.transaction.amount)
			setValue("location", props.transaction.location)
			setValue("note", props.transaction.note)
			setValue("tags", props.transaction.tags.join(","))
		}
	}, [props.transaction])

	const onSubmit = (data) => {
		console.log(data)

		if (isNew) {
			dispatch(
				transactionsStore.actions.create({
					_type: data.type,
					wallet_id: data.wallet_id,
					amount: data.amount,
					currency: Currency.HUF,
					timestamp: new Date(data.timestamp).toISOString(),
					category_id: data.category_id,
					note: data.note,
					location: data.location,
					tags: data.tags.split(","),
				}),
			)

			resetForm()
		} else {
			dispatch(
				transactionsStore.actions.update({
					id: props.transaction.id,
					_type: data.type,
					wallet_id: data.wallet_id,
					amount: data.amount,
					currency: Currency.HUF,
					timestamp: new Date(data.timestamp).toISOString(),
					category_id: data.category_id,
					note: data.note,
					location: data.location,
					tags: data.tags.split(","),
				}),
			)

			// props.onCloseClick()
			resetForm()
		}
	}

	const onResetClick = () => {
		resetForm()
	}

	const resetForm = () => {
		reset()
	}

	return (
		<Box w="370px" borderLeft="2px" borderLeftColor="gray.200" bg={t("white", "gray.900")} boxShadow="lg" zIndex="20">
			<Flex direction="column" h="100%" as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
				<Flex px="6" py="2" minH="60px" alignItems="center" justifyContent="space-between" borderBottom="1px" borderBottomColor="gray.200">
					<Box>
						<Heading size="md">Transaction editor</Heading>
						{!isNew && (
							<Code mt="1" size="xs" variant="outline">
								{props.transaction.id}
							</Code>
						)}
					</Box>
					<CloseButton onClick={props.onCloseClick} />
				</Flex>
				<Box px="6" py="4" flexGrow="1" overflowY="auto">
					<Stack spacing="6">
						<FormControl isRequired>
							<FormLabel>Type</FormLabel>
							<Controller
								name="type"
								control={control}
								render={({ field }) => (
									<SelectWithIcon
										id="type"
										isFilterable={false}
										isDisabled={!isNew}
										items={getTypeOptions()}
										icon={(item) => <CategoryIcon colorHex={item.colorHex} iconFa={item.iconFa} mr="0" />}
										onChange={field.onChange}
										selected={field.value}
									/>
								)}
							/>
						</FormControl>

						<FormControl id="timestamp" isRequired>
							<FormLabel>Timestamp</FormLabel>
							<Input {...register("timestamp")} type="date" />
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Wallet</FormLabel>
							<Controller
								name="wallet_id"
								control={control}
								render={({ field }) => (
									<SelectWithIcon
										id="wallet_id"
										isFilterable={true}
										items={wallets}
										icon={(item) => <Avatar name={item.name} src={item.icon_url} size="sm" />}
										onChange={field.onChange}
										selected={field.value}
									/>
								)}
							/>
						</FormControl>

						<FormControl isRequired>
							<FormLabel>Category</FormLabel>
							<Controller
								name="category_id"
								control={control}
								render={({ field }) => (
									<SelectWithIcon
										id="category_id"
										isFilterable={true}
										items={categories}
										icon={(item) => <CategoryIcon colorHex={item.color_hex} iconFa={item.icon_fa} mr="0" />}
										onChange={field.onChange}
										selected={field.value}
									/>
								)}
							/>
						</FormControl>

						<FormControl id="amount" isRequired>
							<FormLabel>Amount</FormLabel>
							<Input {...register("amount")} type="number" />
						</FormControl>

						<FormControl id="location">
							<FormLabel>Location</FormLabel>
							<Input {...register("location")} type="input" />
						</FormControl>

						<FormControl id="note">
							<FormLabel>Note</FormLabel>
							<Textarea {...register("note")} />
						</FormControl>

						<FormControl id="tags">
							<FormLabel>Tags</FormLabel>
							<Input {...register("tags")} type="input" />
							<FormHelperText>Seperate values by comma</FormHelperText>
						</FormControl>
					</Stack>

					{!isNew && (
						<>
							<Divider my="10" />
							<Stack fontSize="xs" color="gray.500">
								<Center>ID: {props.transaction.id}</Center>
								<Center>Created at: {props.transaction.created_at}</Center>
								<Center>Updated at at: {props.transaction.updated_at || "---"}</Center>
							</Stack>
						</>
					)}
				</Box>

				<HStack px="6" py="4" alignItems="center" justifyContent="space-between" borderTop="1px" borderTopColor="gray.200">
					<Button disabled={apiCreating || apiUpdating} onClick={onResetClick} isFullWidth>
						Reset
					</Button>

					<Button isLoading={apiCreating || apiUpdating} colorScheme="brand" type="submit" isFullWidth>
						Save
					</Button>
				</HStack>
			</Flex>
		</Box>
	)
}

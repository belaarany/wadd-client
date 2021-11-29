import { Avatar, Box, Button, CloseButton, Flex, FormControl, FormLabel, Heading, Input, Textarea } from "@chakra-ui/react";
import { CategoryIcon } from "@wadd/components";
import SelectWithIcon from "@wadd/components/SelectWithIcon";
import { walletsStore } from "@wadd/redux/features";
import { categoriesStore } from "@wadd/redux/features/categories";
import { useAppDispatch } from "@wadd/redux/store";
import { getTypeOptions } from "@wadd/utils/getTypeOptions";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default () => {
	const wallets = useSelector(walletsStore.selectors.selectAll)
	const categories = useSelector(categoriesStore.selectors.selectAll)
	const dispatch = useAppDispatch()
	const { register, handleSubmit } = useForm()
	const [selectValues, setSelectValues] = useState({})

	const onSubmit = data => {
		console.log(data)
	}

	const onTypeChange = (event) => {
		setSelectValues({
			...selectValues,
			[event.id]: event.value
		})
	}

	return (
		<Box w="370px" ml="8" borderLeft="1px" borderLeftColor="gray.200" bg="white">
			<Flex px="6" py="4" alignItems="center" justifyContent="space-between" borderBottom="1px" borderBottomColor="gray.200">
				<Heading size="md">Transaction editor</Heading>
				<CloseButton />
			</Flex>
			<Box px="6" py="4">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl id="type" isRequired mb="6">
						<FormLabel>Type</FormLabel>
						<SelectWithIcon
							id="type"
							isFilterable={false}
							items={getTypeOptions()}
							icon={(item) => <CategoryIcon colorHex={item.colorHex} iconFa={item.iconFa} mr="0" />}
							onChange={onTypeChange}
						/>
					</FormControl>

					<FormControl id="timestamp" isRequired mb="6">
						<FormLabel>Timestamp</FormLabel>
						<Input {...register("timestamp")} type="date" />
					</FormControl>

					<FormControl id="wallet" isRequired mb="6">
						<FormLabel>Wallet</FormLabel>
						<SelectWithIcon
							id="wallet"
							items={wallets}
							icon={(item) => <Avatar name={item.name} src={item.icon_url} size="sm" />}
							onChange={onTypeChange}
						/>
					</FormControl>

					<FormControl id="category" isRequired mb="6">
						<FormLabel>Category</FormLabel>
						<SelectWithIcon
							id="category"
							items={categories}
							icon={(item) => <CategoryIcon colorHex={item.color_hex} iconFa={item.icon_fa} mr="0" />}
							onChange={onTypeChange}
						/>
					</FormControl>

					<FormControl id="amount" isRequired mb="6">
						<FormLabel>Amount</FormLabel>
						<Input {...register("amount")} type="number" />
					</FormControl>

					<FormControl id="location" isRequired mb="6">
						<FormLabel>Location</FormLabel>
						<Input {...register("location")} type="input" />
					</FormControl>

					<FormControl id="note" isRequired mb="6">
						<FormLabel>Note</FormLabel>
						<Textarea {...register("note")} />
					</FormControl>

					<Button colorScheme="brand" isFullWidth type="submit">Save</Button>
				</form>
			</Box>
		</Box>
	)
}

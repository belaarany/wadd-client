import { Flex, Heading, Table, Tbody, Td, toast, Box, Thead, Th, useDisclosure, Button, Center, Spinner, Stack, Grid, Tag, Skeleton, Image } from "@chakra-ui/react"
import { CategoryIcon } from "@wadd/components"
import TransactionEditor from "@wadd/modules/transaction-editor"
import WalletsSidebar from "@wadd/modules/wallets-sidebar"
import { categoriesStore, transactionsStore, walletsStore } from "@wadd/redux/features"
import { useAppDispatch, useAppSelector } from "@wadd/redux/store"
import { useApiState } from "@wadd/utils/useApiState"
import React, { useEffect, useState } from "react"
import moment from "moment"
import _ from "lodash"
import { Transaction } from "@wadd/models/transaction"
import { getTypeOptions } from "@wadd/utils/getTypeOptions"
import { BaseLayout, LeftSidebar, MainContent } from "@wadd/layout/app"

export default () => {
	const dispatch = useAppDispatch()
	const transactions = useAppSelector(transactionsStore.selectors.selectAll)
	const walletEntities = useAppSelector(walletsStore.selectors.selectEntities)
	const walletIds = useAppSelector(walletsStore.selectors.selectIds)
	const categoryEntities = useAppSelector(categoriesStore.selectors.selectEntities)
	const activeWalletId = useAppSelector(walletsStore.selectors.activeWalletId)
	const walletsApiState = useApiState("wallets")
	const { state: transactionsApiState } = useApiState("transactions")
	const { isOpen: isTransactionEditorOpen, onOpen: onTransactionEditorOpen, onClose: onTransactionEditorClose } = useDisclosure()
	const [activeTransaction, setActiveTranaction] = useState<null | Transaction>(null)

	useEffect(() => {
		if (!walletIds.length) {
			return
		}

		dispatch(
			transactionsStore.actions.getAll({
				selectedWalletIds: activeWalletId ? [activeWalletId] : walletIds,
			}),
		)
	}, [activeWalletId])

	walletsApiState.onChange((prev, state) => {
		if (prev?.status && prev?.operation === "getAll" && state.status === "idle") {
			if (!walletIds.length) {
				return
			}

			dispatch(
				transactionsStore.actions.getAll({
					selectedWalletIds: walletIds,
				}),
			)
		}
	})

	const onAddTransactionClick = () => {
		setActiveTranaction(null)
		onTransactionEditorOpen()
	}

	const onTransactionClick = (transaction: Transaction) => {
		setActiveTranaction(transaction)
		onTransactionEditorOpen()
	}

	return (
		<BaseLayout>
			<LeftSidebar>
				<WalletsSidebar />
			</LeftSidebar>

			<MainContent>
				<Flex aligItems="center" justifyContent="space-between" mb="6">
					<Heading size="lg">Transactions</Heading>

					<Button colorScheme="brand" onClick={onAddTransactionClick} leftIcon={<i className="fad fa-plus-circle" style={{ fontSize: "130%" }}></i>}>
						Add Transaction
					</Button>
				</Flex>

				<Box w="100%" overflowY="auto">
					{transactionsApiState.status === "pending" && (
						<Stack spacing="6">
							<Stack>
								<Skeleton startColor="gray.100" endColor="gray.200" w="130px" h="20px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
							</Stack>
							<Stack>
								<Skeleton startColor="gray.100" endColor="gray.200" w="130px" h="20px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
							</Stack>
							<Stack>
								<Skeleton startColor="gray.100" endColor="gray.200" w="130px" h="20px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
								<Skeleton startColor="gray.100" endColor="gray.200" h="60px" borderRadius="base" />
							</Stack>
						</Stack>
					)}
					{transactionsApiState.status === "idle" && transactions.length === 0 && walletsApiState.state.status === "idle" && (
						<Center mt="10%">
							<Stack align="center">
								<Image src="/images/empty.png" boxSize="250px" />
								<Heading size="md">No transactions</Heading>
							</Stack>
						</Center>
					)}
					{transactionsApiState.status === "idle" && transactions.length > 0 && (
						<>
							{/* <Grid templateColumns="repeat(4, 1fr)" gap={6} py="2" px="4" textTransform="uppercase" fontSize="sm" fontWeight="semibold">
										<Box>Category</Box>
										<Box>Category</Box>
										<Box>Category</Box>
										<Box>Amount</Box>
									</Grid> */}

							{_.chain(transactions)
								.orderBy((transaction) => moment(transaction.timestamp).format("YYYY-MM-DD"), "desc")
								.groupBy((transaction) => moment(transaction.timestamp).format("YYYY-MM-DD"))
								.map((transactions, key) => (
									<>
										<Box fontSize="sm" fontWeight="medium" mb="2" color="gray.500" bg="gray.50" zIndex="sticky">
											{moment(key).format("MMM Do, YYYY")}
										</Box>
										<Box bg="white" borderRadius="lg" mb="6" boxShadow="sm" _border="1px" borderColor="gray.200" overflow="hidden">
											{_.map(transactions, (transaction) => (
												<Grid
													templateColumns="repeat(5, 1fr)"
													gap={6}
													py="2"
													px="4"
													key={transaction.id}
													data-transaction-id={transaction.id}
													cursor="pointer"
													_hover={{
														backgroundColor: "gray.100",
													}}
													transitionProperty="common"
													transitionDuration="normal"
													onClick={() => onTransactionClick(transaction)}
												>
													{transaction.kind === "income" && (
														<>
															<Box>
																<Flex direction="row" alignItems="center">
																	<CategoryIcon
																		iconFa={categoryEntities[transaction.category_id]?.icon_fa || "question"}
																		colorHex={categoryEntities[transaction.category_id]?.color_hex || "#555"}
																		mr="4"
																	/>
																	<Flex direction="column">
																		<Box fontWeight="medium" mb="0.5">
																			{categoryEntities[transaction.category_id]?.name || "N/A"}
																		</Box>
																		<Box fontWeight="normal" fontSize="xs" color="gray.500">
																			{walletEntities[transaction.wallet_id]?.name || "N/A"}
																		</Box>
																	</Flex>
																</Flex>
															</Box>
															<Box>{transaction.note || "---"}</Box>
															<Box>{transaction.location || "---"}</Box>
															<Box>{!!transaction.tags.length ? transaction.tags?.map((tag) => <Tag mr="2">{tag}</Tag>) : "---"}</Box>
															<Box fontFamily="mono" color="green.400" textAlign="right">
																{"+"}
																{transaction.amount} {" HUF"}
															</Box>
														</>
													)}
													{transaction.kind === "expense" && (
														<>
															<Box>
																<Flex direction="row" alignItems="center">
																	<CategoryIcon
																		iconFa={categoryEntities[transaction.category_id]?.icon_fa || "question"}
																		colorHex={categoryEntities[transaction.category_id]?.color_hex || "#555"}
																		mr="4"
																	/>
																	<Flex direction="column">
																		<Box fontWeight="medium" mb="0.5">
																			{categoryEntities[transaction.category_id]?.name || "N/A"}
																		</Box>
																		<Box fontWeight="normal" fontSize="xs" color="gray.500">
																			{walletEntities[transaction.wallet_id]?.name || "N/A"}
																		</Box>
																	</Flex>
																</Flex>
															</Box>
															<Box>{transaction.note || "---"}</Box>
															<Box>{transaction.location || "---"}</Box>
															<Box>{!!transaction.tags.length ? transaction.tags?.map((tag) => <Tag mr="2">{tag}</Tag>) : "---"}</Box>
															<Box isNumeric fontFamily="mono" color="red.400" textAlign="right">
																{"-"}
																{transaction.amount} {" HUF"}
															</Box>
														</>
													)}
													{transaction.kind === "transfer" && (
														<>
															<Box>
																<Flex direction="row" alignItems="center">
																	<CategoryIcon iconFa={getTypeOptions("transfer")[0].iconFa} colorHex={getTypeOptions("transfer")[0].colorHex} mr="4" />
																	<Flex direction="column">
																		<Box fontWeight="medium" mb="0.5">
																			{activeWalletId === null && "Transfer"}
																			{activeWalletId === transaction.target_wallet_id && "Incoming Transfer"}
																			{activeWalletId === transaction.source_wallet_id && "Outgoing Transfer"}
																		</Box>
																		<Stack direction="row" spacing="1.5" fontWeight="normal" fontSize="xs" color="gray.500">
																			<Box>{walletEntities[transaction.source_wallet_id]?.name || "N/A"}</Box>
																			<Box>
																				<i className="fal fa-long-arrow-right"></i>
																			</Box>
																			<Box>{walletEntities[transaction.target_wallet_id]?.name || "N/A"}</Box>
																		</Stack>
																	</Flex>
																</Flex>
															</Box>
															<Box>{transaction.note || "---"}</Box>
															<Box>---</Box>
															<Box>---</Box>
															<Box isNumeric fontFamily="mono" color="blue.400" textAlign="right">
																{activeWalletId === transaction.target_wallet_id && "+"}
																{activeWalletId === transaction.source_wallet_id && "-"}
																{transaction.source_amount} {" HUF"}
															</Box>
														</>
													)}
												</Grid>
											))}
										</Box>
									</>
								))
								.value()}
						</>
					)}
				</Box>
			</MainContent>

			{isTransactionEditorOpen && <TransactionEditor transaction={activeTransaction} onCloseClick={onTransactionEditorClose} />}
		</BaseLayout>
	)
}

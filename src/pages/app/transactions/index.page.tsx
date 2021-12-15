import { Flex, Heading, Table, Tbody, Td, toast, Box, Thead, Th, useDisclosure, Button, Center, Spinner, Stack, Grid, Tag, Skeleton } from "@chakra-ui/react"
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

export default () => {
	const dispatch = useAppDispatch()
	const transactions = useAppSelector(transactionsStore.selectors.selectAll)
	const walletEntities = useAppSelector(walletsStore.selectors.selectEntities)
	const walletIds = useAppSelector(walletsStore.selectors.selectIds)
	const categoryEntities = useAppSelector(categoriesStore.selectors.selectEntities)
	const activeWalletId = useAppSelector(walletsStore.selectors.activeWalletId)
	const { onChange: onWalletsApiStateChange } = useApiState("wallets")
	const { state: transactionsApiState } = useApiState("transactions")
	const { isOpen: isTransactionEditorOpen, onOpen: onTransactionEditorOpen, onClose: onTransactionEditorClose } = useDisclosure()
	const [activeTransaction, setActiveTranaction] = useState<null | Transaction>(null)

	useEffect(() => {
		if (!walletIds) {
			return
		}

		dispatch(
			transactionsStore.actions.getAll({
				selectedWalletIds: activeWalletId ? [activeWalletId] : walletIds,
			}),
		)
	}, [activeWalletId])

	onWalletsApiStateChange((prev, state) => {
		if (prev?.status && prev?.operation === "getAll" && state.status === "idle") {
			if (!walletIds) {
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
		<React.Fragment>
			<Flex h="100%" w="full" flexDir="column">
				<Flex maxH="100%" grow="1">
					<WalletsSidebar />

					<Flex grow="1" flexDirection="column" _bg="white">
						<Flex aligItems="center" justifyContent="space-between" px="8" py="6">
							<Heading size="lg">Transactions</Heading>

							<Button colorScheme="brand" onClick={onAddTransactionClick} leftIcon={<i className="fad fa-plus-circle" style={{ fontSize: "130%" }}></i>}>
								Add Transaction
							</Button>
						</Flex>

						<Box w="100%" px="8" pb="6" overflowY="auto">
							{transactionsApiState.status === "pending" /*&& transactionsApiState.operation === "getAll"*/ && (
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
							{transactionsApiState.status === "idle" && (
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
															_hover={{
																cursor: "pointer",
																backgroundColor: "gray.100",
															}}
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
														</Grid>
													))}
												</Box>
											</>
										))
										.value()}
								</>
							)}
						</Box>
					</Flex>

					{isTransactionEditorOpen && <TransactionEditor transaction={activeTransaction} onCloseClick={onTransactionEditorClose} />}
				</Flex>
			</Flex>
		</React.Fragment>
	)
}

import { Box, Flex, Heading, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"
import WalletsSidebar from "@wadd/modules/wallets-sidebar"
import TransactionEditor from "@wadd/modules/transaction-editor"

export default () => {
	return (
		<React.Fragment>
			<Flex h="100%" w="full" flexDir="column">
				<Flex grow="1">
					<WalletsSidebar />

					<Flex grow="1" py="6">
						<Box>
							<Heading size="lg" mb="6">Transactions</Heading>

							<Table>
								<Thead>
									<Tr>
										<Th>Wallet</Th>
										<Th>Category</Th>
										<Th>Note</Th>
										<Th isNumeric>Date</Th>
										<Th isNumeric>Amount</Th>
									</Tr>
								</Thead>
								<Tbody>
									{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(_ => (
										<Tr>
											<Td>OTP Bank</Td>
											<Td>Subscriptions</Td>
											<Td>My note</Td>
											<Td isNumeric>2021-01-11</Td>
											<Td isNumeric fontFamily="mono">13,690 HUF</Td>
										</Tr>
									))}
								</Tbody>
							</Table>
						</Box>
					</Flex>

					<TransactionEditor />
				</Flex>
			</Flex>

		</React.Fragment>
	)
}

import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Flex, Box, Avatar, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react"
import React from "react"
import { useSelector } from "react-redux"
import { selectors as walletSelectors } from "../../../redux/features/wallets"
import Color from "color"
import { Card } from "../../../components"

export default () => {
	const wallets = useSelector(walletSelectors.selectAll)

	return (
		<React.Fragment>
			<Flex h="100%" flexDir="column">
				<Heading size="lg" mb="6">Transactions</Heading>

				<Flex grow="1">
					<Box pr="8" mr="8" borderRight="1px" borderRightColor="gray.200">

						{wallets.map(wallet => (
							<Box py="3" px="4" mb="5" w="250px" border="2px" borderRadius="md" style={{
								borderColor: wallet.color_hex,
								backgroundColor: Color(wallet.color_hex).fade(0.85)
							}}>
								<Flex justifyContent="space-between" alignItems="center">
									<Flex alignItems="center">
										{/* <Avatar name={wallet.name} src={wallet.icon_url} size="sm" mr="4" border="2px" style={{
											borderColor: wallet.color_hex,
											backgroundColor: wallet.color_hex
										}} /> */}
										<Box>
											<Box mb="1" fontWeight="semibold">{wallet.name}</Box>
											<Box fontFamily="mono" fontWeight="200">
												15,000 HUF
											</Box>
										</Box>
									</Flex>

									<Box fontFamily="mono">
										{/* 15,000 HUF */}
									</Box>
								</Flex>
							</Box>
						))}

					</Box>

					<Box grow="1">
						{/* <Card w="full"> */}
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
						{/* </Card> */}
					</Box>
				</Flex>
			</Flex>

		</React.Fragment>
	)
}

import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Box } from "@chakra-ui/react"
import React from "react"
import WalletsTab from "./wallets"
import CategoriesTab from "./categories"

export default () => {
	return (
		<Box py="4" px="8">
			<Heading size="lg" mb="6">Settings</Heading>

			<Tabs colorScheme="brand" defaultIndex={0}>
				<TabList mb="4">
					<Tab>Wallets</Tab>
					<Tab>Categories</Tab>
				</TabList>

				<TabPanels>
					<TabPanel overflow="auto">
						<WalletsTab />
					</TabPanel>
					<TabPanel overflow="auto">
						<CategoriesTab />
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	)
}

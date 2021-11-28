import { Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import React from "react"
import WalletsTab from "./wallets"
import CategoriesTab from "./categories"

export default () => {
	return (
		<React.Fragment>
			<Heading size="lg" mb="6">Settings</Heading>

			<Tabs colorScheme="brand" defaultIndex={0}>
				<TabList mb="4">
					<Tab>Wallets</Tab>
					<Tab>Categories</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<WalletsTab />
					</TabPanel>
					<TabPanel>
						<CategoriesTab />
					</TabPanel>
				</TabPanels>
			</Tabs>

		</React.Fragment>
	)
}

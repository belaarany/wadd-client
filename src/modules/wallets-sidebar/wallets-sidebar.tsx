import { Box, Flex } from "@chakra-ui/react"
import { walletsStore } from "@wadd/redux/features"
import { useAppDispatch } from "@wadd/redux/store"
import Color from "color"
import { useSelector } from "react-redux"

export default () => {
	const dispatch = useAppDispatch()
	const wallets = useSelector(walletsStore.selectors.selectAll)

	return (
		<Box w="300px" p="8" mr="8" borderRight="1px" borderRightColor="gray.200">

			{wallets.map(wallet => (
				<Box py="3" px="4" mb="5" w="full" border="2px" borderRadius="md" style={{
					borderColor: wallet.color_hex,
					backgroundColor: Color(wallet.color_hex).fade(0.85)
				}} onClick={() => dispatch(walletsStore.actions.setActiveWalletId(wallet.id))}>
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
	)
}

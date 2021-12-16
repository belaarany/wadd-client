import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react"
import { walletsStore } from "@wadd/redux/features"
import { useAppDispatch, useAppSelector } from "@wadd/redux/store"
import { useApiState } from "@wadd/utils/useApiState"
import Color from "color"

export default () => {
	const dispatch = useAppDispatch()
	const wallets = useAppSelector(walletsStore.selectors.selectAll)
	const activeWalletId = useAppSelector(walletsStore.selectors.activeWalletId)
	const walletsApiState = useApiState("wallets")

	return (
		<Box w="300px" p="8" borderRight="1px" borderRightColor="gray.200">
			<Box
				py="3"
				px="4"
				mb="5"
				w="full"
				border="1px"
				borderRadius="md"
				bg="gray.200"
				borderColor="gray.500"
				fontWeight="semibold"
				onClick={() => dispatch(walletsStore.actions.setActiveWalletId(null))}
				boxShadow={activeWalletId === null && "var(--chakra-colors-gray-500) 0px 0px 0px 1.5px"}
				position="relative"
				overflow="hidden"
				cursor="pointer"
				transitionProperty="common"
				transitionDuration="normal"
				_hover={{
					boxShadow: `var(--chakra-colors-gray-500) 0px 0px 0px 1px`
				}}
			>
				All Wallets
			</Box>

			{walletsApiState.state.status === "pending" && (
				<Stack spacing={6}>
					<Skeleton startColor="gray.100" endColor="gray.200" h="76px" borderRadius="base" />
					<Skeleton startColor="gray.100" endColor="gray.200" h="76px" borderRadius="base" />
					<Skeleton startColor="gray.100" endColor="gray.200" h="76px" borderRadius="base" />
				</Stack>
			)}

			{wallets.map((wallet) => (
				<Box
					py="3"
					px="4"
					mb="5"
					w="full"
					border="1px"
					borderRadius="md"
					cursor="pointer"
					style={{
						borderColor: wallet.color_hex,
						// backgroundColor: Color(wallet.color_hex).fade(0.85),
					}}
					bgGradient={`linear(to-tl, ${Color(wallet.color_hex).fade(0.65)}, ${Color(wallet.color_hex).fade(0.85)})`}
					position="relative"
					overflow="hidden"
					transitionProperty="common"
					transitionDuration="normal"
					_after={{
						content: "''",
						position: "absolute",
						top: "0",
						bottom: "0",
						left: "0",
						right: "0",
						backgroundImage: `url(${wallet.icon_url})`,
						backgroundPosition: "center center",
						opacity: "0.025",
					}}
					_hover={{
						boxShadow: `${wallet.color_hex} 0px 0px 0px 1px`
					}}
					boxShadow={activeWalletId === wallet.id && `${wallet.color_hex} 0px 0px 0px 1.5px`}
					onClick={() => dispatch(walletsStore.actions.setActiveWalletId(wallet.id))}
				>
					<Flex justifyContent="space-between" alignItems="center">
						<Flex alignItems="center">
							{/* <Avatar name={wallet.name} src={wallet.icon_url} size="sm" mr="4" border="2px" style={{
											borderColor: wallet.color_hex,
											backgroundColor: wallet.color_hex
										}} /> */}
							<Box>
								<Box mb="1" fontWeight="semibold">
									{wallet.name}
								</Box>
								<Box fontFamily="mono" fontWeight="200">
									15,000 HUF
								</Box>
							</Box>
						</Flex>

						<Box fontFamily="mono">{/* 15,000 HUF */}</Box>
					</Flex>
				</Box>
			))}
		</Box>
	)
}

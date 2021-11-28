import { Center } from "@chakra-ui/react"
import Color from "color"

export default ({ colorHex, iconFa, mr }) => (
	<Center bg="white" w="32px" h="32px" borderRadius="50%" overflow="hidden" mr={mr || 0}>
		<Center p="2" w="full" h="full" style={{
			color: colorHex,
			backgroundColor: Color(colorHex).fade(0.85)
		}}>
			<i className={`fad fa-${iconFa}`}></i>
		</Center>
	</Center>
)

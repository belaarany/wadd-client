import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
	config: {
		initialColorMode: "light",
	},
	fonts: {
		heading: "Quicksand",
		body: "Quicksand",
	},
	colors: {
		brand: {
			50: "#e8e6fe",
			100: "#c6c1fe",
			200: "#afa8fd",
			300: "#a39bfd",
			400: "#988ffc",
			500: "#8c82fc",
			600: "#7e75e3",
			700: "#7068ca",
			800: "#544e97",
			900: "#383465",
		},
	},
	components: {
		Code: {
			baseStyle: {
				fontSize: "xs",
				borderRadius: "base",
			},
			variants: {
				outline: ({ colorScheme }) => ({
					border: "1px",
					borderColor: `${colorScheme}.200`,
					background: `${colorScheme}.50`,
					color: `${colorScheme}.500`,
					boxShadow: "none",
				}),
			},
		},
	},
})

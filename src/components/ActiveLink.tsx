import { Box } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

export default ({ children, href, activeProps, ...props }: any) => {
	const { asPath } = useRouter()
	const actualActiveProps = asPath === href ? activeProps : null

	return (
		<Link href={href}>
			{React.createElement(props.as || Box, {
				...props,
				...actualActiveProps,
				children,
			})}
		</Link>
	)
}

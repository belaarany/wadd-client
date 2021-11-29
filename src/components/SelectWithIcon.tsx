import { Button } from "@chakra-ui/button"
import { Box, Flex, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, VisuallyHidden } from '@chakra-ui/react'
import React, { useRef, useState, useEffect } from "react"

export default ({ id, items, icon, isFilterable = true, onChange = (event) => { }, defaultValue = null }) => {
	const [filter, setFilter] = useState("")
	const [activeItem, setActiveItem] = useState(null)
	const initRef = useRef()

	useEffect(() => {
		if (defaultValue) {
			setActiveItem(items.find(i => i.id === defaultValue) || null)
		}
	}, [])

	const onSearchChange = (event) => {
		setFilter(event.target.value)
	}

	const onItemClick = (item, onClose) => {
		setActiveItem(item)
		onClose()
		onChange({
			id: id,
			value: item
		})
	}

	return (
		<Popover placement="bottom" initialFocusRef={initRef} matchWidth offset={[0, 3]}>
			{({ isOpen, onClose }) => (
				<>
					<PopoverTrigger>
						<Button variant="outline" justifyContent="left" isFullWidth fontWeight="normal" leftIcon={activeItem ? React.cloneElement(icon(activeItem), { mr: 1 }) : null}>
							{activeItem ? activeItem.name : "Select..."}
							<Box ml="auto" color="gray.500"><i className={`far ${isOpen ? "fa-angle-up" : "fa-angle-down"}`}></i></Box>
						</Button>
					</PopoverTrigger>
					{/* <Portal> */}
					<PopoverContent boxShadow="0px 2px 8px 0px rgb(0 0 0 / 10%) !important" w="100%">
						{/* <PopoverArrow /> */}
						<PopoverBody>
							{isFilterable && <Input placeholder="Search..." mt="1" mb="4" autoFocus ref={initRef} onChange={onSearchChange} />}

							<Box maxH="300px" overflow="auto">
								{items
									.filter(item => item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
									.map(item => (
										<Flex py="1.5" px="2" my="0.5" borderRadius="md" alignItems="center" onClick={onItemClick.bind(null, item, onClose)} cursor="pointer"
											backgroundColor={activeItem?.name === item.name ? "gray.100" : "white"}
											_hover={{
												backgroundColor: "gray.100"
											}}
										>
											{React.cloneElement(icon(item), { mr: 3 })}
											<Box>{item.name}</Box>
										</Flex>
									))}
							</Box>
						</PopoverBody>
					</PopoverContent>
					{/* </Portal> */}
				</>
			)}
		</Popover>
	)
}

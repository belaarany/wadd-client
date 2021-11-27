import { useState, useEffect } from "react"
import { useAppSelector } from "../redux/store"

export const useStateApi = (feature: string) => {
	const [prev, setPrev] = useState(null)
	const next = useAppSelector((state) => state[feature].api)

	return {
		previous: prev,
		state: next,
		onChange: (callback) => {
			useEffect(() => {
				callback(prev, next)
				setPrev(next)
			}, [next])
		},
	}
}

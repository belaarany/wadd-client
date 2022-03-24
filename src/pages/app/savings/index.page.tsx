import { Button, Stack, useDisclosure } from "@chakra-ui/react"
import { BaseLayout, LeftSidebar, MainContent } from "@wadd/layout/app"
import { SavingsGoal } from "@wadd/models/savings-goal"
import { savingsGoalsStore } from "@wadd/redux/features"
import { useAppDispatch, useAppSelector } from "@wadd/redux/store"
import React, { useEffect, useState } from "react"
import ActiveItem from "./active-item"
import SavingsGoalModal from "./savings-goal-modal"

export default () => {
	const dispatch = useAppDispatch()
	const savingsGoals = useAppSelector(savingsGoalsStore.selectors.selectAll)
	const [activeSavingsGoal, setActiveSavingsGoal] = useState<SavingsGoal | null>(null)
	const [editSavingsGoal, setEditSavingsGoal] = useState<SavingsGoal | null>(null)
	const savingsGoalModalDisclosure = useDisclosure()

	useEffect(() => {
		dispatch(savingsGoalsStore.actions.getAll({}))
	}, [])

	const onSavingsGoalClick = (savingsGoal: SavingsGoal) => {
		setActiveSavingsGoal(savingsGoal)
	}

	const onCreateClick = () => {
		setEditSavingsGoal(null)
		savingsGoalModalDisclosure.onOpen()
	}

	return (
		<>
			<BaseLayout>
				<LeftSidebar>
					<Stack>
						{savingsGoals.map((savingsGoal) => (
							<Button onClick={() => onSavingsGoalClick(savingsGoal)}>{savingsGoal.name}</Button>
						))}

						<Button onClick={onCreateClick} variant="ghost">
							Create Savings Goal
						</Button>
					</Stack>
				</LeftSidebar>
				<MainContent>
					<ActiveItem savingsGoal={activeSavingsGoal} />
				</MainContent>
			</BaseLayout>

			<SavingsGoalModal savingsGoal={editSavingsGoal} isOpen={savingsGoalModalDisclosure.isOpen} onClose={savingsGoalModalDisclosure.onClose} />
		</>
	)
}

import gql from "graphql-tag"

export const SavingsGoalsGQLFragment = gql`
	fragment savingsGoalFields on SavingsGoal {
		id
		kind
		owner_user_id
		name
		start_amount
		goal_amount
		currency
		is_locked
		is_deleted
		created_at
		updated_at
		deleted_at
	}
`

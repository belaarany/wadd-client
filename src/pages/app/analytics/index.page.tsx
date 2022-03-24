import { Box } from "@chakra-ui/react"
import { Card } from "@wadd/components"
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from "recharts"

const data = [
	{
		month: "Jan",
		total: 4000,
	},
	{
		month: "Feb",
		total: 3500,
	},
	{
		month: "Mar",
		total: 4200,
	},
	{
		month: "Apr",
		total: 4000,
	},
	{
		month: "May",
		total: 4000,
	},
	{
		month: "Jun",
		total: 5000,
	},
	{
		month: "Jul",
		total: 4000,
	},
	{
		month: "Aug",
		total: 4000,
	},
	{
		month: "Sept",
		total: 3000,
	},
	{
		month: "Oct",
		total: 6000,
	},
	{
		month: "Nov",
		total: 4000,
	},
	{
		month: "Dec",
		total: 4000,
	},
]

export default () => {
	return (
		<Box p="10">
			<Card header="Running balance">
				<Box p="6" h="300px">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={data} >
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="total" fill="#8884d8" />
						</BarChart>
					</ResponsiveContainer>
				</Box>
			</Card>
		</Box>
	)
}

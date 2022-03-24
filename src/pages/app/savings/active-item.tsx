import { Stack, Box, Table, Thead, Tr, Th, Tbody, Td, Tfoot, Button } from "@chakra-ui/react"
import { Card } from "@wadd/components"
import { SavingsGoal } from "@wadd/models/savings-goal"
import _ from "lodash"
import moment from "moment"
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from "recharts"

const colors = {
	deposited: {
		color: "white",
		bg: "#38A169",
	},
	remaining: {
		color: "black",
		bg: "#CBD5E0",
	},
}

const data01 = [
	{ name: "deposited", value: 3850 },
	{ name: "remaining", value: 5000 - 3850 },
]

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

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, name }) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5
	const x = cx + radius * Math.cos(-midAngle * RADIAN)
	const y = cy + radius * Math.sin(-midAngle * RADIAN)

	return (
		<text x={x} y={y} fill={colors[name].color} textAnchor={"middle"} dominantBaseline="middle">
			{value} HUF
		</text>
	)
}

interface Props {
	savingsGoal: SavingsGoal | null
}

export default (props: Props) => {
	if (!props.savingsGoal) {
		return null
	}

	return (
		<>
			<Stack direction="row" width="100%" spacing="6">
					<Box w="250px">
						<Card header="Details">
							<Box p="6">Name: {props.savingsGoal.name}</Box>
							<Box p="6">Goal: {props.savingsGoal.goal_amount}</Box>
						</Card>
					</Box>

					<Box>
						<Card header="Progress">
							<Box h="250px" w="250px">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie dataKey="value" data={data01} label={renderCustomizedLabel} labelLine={false} fill="#8884d8">
											{data01.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={colors[entry.name].bg} />
											))}
										</Pie>
									</PieChart>
								</ResponsiveContainer>
							</Box>
						</Card>
					</Box>

					<Box flexGrow="1">
						<Card header="Deposit flow">
							<Box p="6" h="250px">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={data}>
										<CartesianGrid vertical={false} strokeDasharray="5 5" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Bar dataKey="total" fill="#38A169" />
									</BarChart>
								</ResponsiveContainer>
							</Box>
						</Card>
					</Box>
				</Stack>

				<Box mt="10">
					<Card header="Deposit summary" action={<Button colorScheme="brand">Add Deposit</Button>}>
						<Table>
							<Thead>
								<Tr>
									{_.map(_.range(0, 12), (i) => (
										<Th>{moment().month(i).format("MMMM")}</Th>
									))}
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>inches</Td>
									<Td>millimetres (mm)</Td>
									<Td isNumeric>25.4</Td>
								</Tr>
								<Tr>
									<Td>feet</Td>
									<Td>centimetres (cm)</Td>
									<Td isNumeric>30.48</Td>
								</Tr>
								<Tr>
									<Td>yards</Td>
									<Td>metres (m)</Td>
									<Td isNumeric>0.91444</Td>
								</Tr>
								{/* <Tr>
									{_.map(_.range(0, 12), (i) => (
										<Th>
											<Button variant="outline" size="xs" isFullWidth={true}>Add</Button>
										</Th>
									))}
								</Tr> */}
							</Tbody>
							<Tfoot>
								<Tr>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
									<Th>500</Th>
								</Tr>
							</Tfoot>
						</Table>
					</Card>
				</Box>
		</>
	)
}

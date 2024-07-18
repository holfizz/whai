import React from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'

const CustomTable = ({ children }) => {
	return <Table aria-label='Markdown Table'>{children}</Table>
}

const CustomTableHeader = ({ children }) => (
	<TableHeader>{children}</TableHeader>
)
const CustomTableRow = ({ children }) => <TableRow>{children}</TableRow>
const CustomTableColumn = ({ children }) => (
	<TableColumn>{children}</TableColumn>
)
const CustomTableBody = ({ children }) => <TableBody>{children}</TableBody>
const CustomTableCell = ({ children }) => <TableCell>{children}</TableCell>

export {
	CustomTable,
	CustomTableHeader,
	CustomTableRow,
	CustomTableColumn,
	CustomTableBody,
	CustomTableCell
}

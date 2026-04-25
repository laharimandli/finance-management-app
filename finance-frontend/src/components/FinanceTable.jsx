import { Table, Button, Group, Badge, Text } from '@mantine/core'

const columns = [
    { key: 'userName', label: 'User Name' },
    { key: 'type', label: 'Type' },
    { key: 'category', label: 'Category' },
    { key: 'amount', label: 'Amount' },
    { key: 'description', label: 'Description' },
    { key: 'date', label: 'Date' },
]

const FinanceTable = ({ records, onEdit, onDelete, onSort, sortBy, sortDir }) => {

    const handleSort = (key) => {
        const direction = sortBy === key && sortDir === 'asc' ? 'desc' : 'asc'
        onSort(key, direction)
    }

    const renderCell = (col, record) => {
        if (col.key === 'type') {
            return (
                <Badge color={record.type === 'INCOME' ? 'green' : 'red'}>
                    {record.type}
                </Badge>
            )
        }
        if (col.key === 'amount') {
            return (
                <Text c={record.type === 'INCOME' ? 'green' : 'red'}>
                    ₹{record.amount}
                </Text>
            )
        }
        return record[col.key]
    }

    return (
        <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    {columns.map(col => (
                        <Table.Th
                            key={col.key}
                            onClick={() => handleSort(col.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {col.label}
                            {sortBy === col.key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                        </Table.Th>
                    ))}
                    <Table.Th>Actions</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {records.length === 0 ? (
                    <Table.Tr>
                        <Table.Td colSpan={7} align="center">
                            No records found
                        </Table.Td>
                    </Table.Tr>
                ) : (
                    records.map(record => (
                        <Table.Tr key={record.id}>
                            {columns.map(col => (
                                <Table.Td key={col.key}>
                                    {renderCell(col, record)}
                                </Table.Td>
                            ))}
                            <Table.Td>
                                <Group gap="xs">
                                    <Button
                                        size="xs"
                                        variant="outline"
                                        onClick={() => onEdit(record)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        size="xs"
                                        color="red"
                                        variant="outline"
                                        onClick={() => onDelete(record.id)}
                                    >
                                        Delete
                                    </Button>
                                </Group>
                            </Table.Td>
                        </Table.Tr>
                    ))
                )}
            </Table.Tbody>
        </Table>
    )
}

export default FinanceTable
import { useState, useCallback } from 'react'
import { Container, Title, Button, Group, LoadingOverlay } from '@mantine/core'
import FinanceTable from './components/FinanceTable'
import FinanceForm from './components/FinanceForm'
import DeleteConfirm from './components/DeleteConfirm'
import { getAllRecords, createRecord, updateRecord, deleteRecord } from './api/financeApi'

const App = () => {
    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(false)
    const [formOpened, setFormOpened] = useState(false)
    const [deleteOpened, setDeleteOpened] = useState(false)
    const [editData, setEditData] = useState(null)
    const [deleteId, setDeleteId] = useState(null)
    const [sortBy, setSortBy] = useState('date')
    const [sortDir, setSortDir] = useState('desc')

    const fetchRecords = useCallback(async (by = sortBy, dir = sortDir) => {
        setLoading(true)
        try {
            const res = await getAllRecords(by, dir)
            setRecords(res.data)
        } catch (err) {
            console.error('Error fetching records:', err)
        } finally {
            setLoading(false)
        }
    }, [sortBy, sortDir])

    const handleAdd = () => {
        setEditData(null)
        setFormOpened(true)
        fetchRecords()
    }

    const handleEdit = (record) => {
        setEditData(record)
        setFormOpened(true)
    }

    const handleDelete = (id) => {
        setDeleteId(id)
        setDeleteOpened(true)
    }

    const handleFormSubmit = async (formData) => {
        setLoading(true)
        try {
            if (editData) {
                await updateRecord(editData.id, formData)
            } else {
                await createRecord(formData)
            }
            setFormOpened(false)
            fetchRecords()
        } catch (err) {
            console.error('Error saving record:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleConfirmDelete = async () => {
        setLoading(true)
        try {
            await deleteRecord(deleteId)
            setDeleteOpened(false)
            fetchRecords()
        } catch (err) {
            console.error('Error deleting record:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleSort = (key, direction) => {
        setSortBy(key)
        setSortDir(direction)
        fetchRecords(key, direction)
    }

    return (
        <Container size="xl" py="xl">
            <LoadingOverlay visible={loading} />

            <Group justify="space-between" mb="xl">
                <Title order={2}>Finance Management</Title>
                <Button onClick={handleAdd}>
                    + Add Record
                </Button>
            </Group>

            <FinanceTable
                records={records}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSort={handleSort}
                sortBy={sortBy}
                sortDir={sortDir}
            />

            <FinanceForm
                key={editData?.id || 'new'}
                opened={formOpened}
                onClose={() => setFormOpened(false)}
                onSubmit={handleFormSubmit}
                editData={editData}
            />

            <DeleteConfirm
                opened={deleteOpened}
                onClose={() => setDeleteOpened(false)}
                onConfirm={handleConfirmDelete}
            />
        </Container>
    )
}

export default App
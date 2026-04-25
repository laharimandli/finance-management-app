import { Modal, TextInput, Select, Button, Group, NumberInput } from '@mantine/core'
import { useState } from 'react'

const FinanceForm = ({ opened, onClose, onSubmit, editData }) => {

    const [formData, setFormData] = useState({
        userName:    editData?.userName          || '',
        type:        editData?.type              || '',
        category:    editData?.category          || '',
        amount:      editData?.amount            || '',
        description: editData?.description       || '',
        date:        editData?.date?.split('T')[0] || '',
    })

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = () => {
        if (!formData.userName || !formData.type || !formData.category || !formData.amount || !formData.date) {
            alert('Please fill in all required fields')
            return
        }
        onSubmit(formData)
    }

    const handleClose = () => {
        onClose()
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={editData ? 'Edit Record' : 'Add New Record'}
            centered
        >
            <TextInput
                label="User Name"
                placeholder="Enter user name"
                value={formData.userName}
                onChange={(e) => handleChange('userName', e.target.value)}
                mb="sm"
            />
            <Select
                label="Type"
                placeholder="Select type"
                data={['INCOME', 'EXPENSE']}
                value={formData.type}
                onChange={(value) => handleChange('type', value)}
                mb="sm"
            />
            <TextInput
                label="Category"
                placeholder="Enter category"
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                mb="sm"
            />
            <NumberInput
                label="Amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(value) => handleChange('amount', value)}
                mb="sm"
            />
            <TextInput
                label="Description"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                mb="sm"
            />
            <TextInput
                label="Date"
                placeholder="YYYY-MM-DD"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                mb="sm"
            />
            <Group justify="flex-end" mt="md">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>
                    {editData ? 'Update' : 'Add'}
                </Button>
            </Group>
        </Modal>
    )
}

export default FinanceForm
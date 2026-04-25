import { Modal, Button, Group, Text } from '@mantine/core'

const DeleteConfirm = ({ opened, onClose, onConfirm }) => {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Delete Record"
            centered
        >
            <Text mb="md">
                Are you sure you want to delete this record?
                This action cannot be undone.
            </Text>
            <Group justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button color="red" onClick={onConfirm}>
                    Delete
                </Button>
            </Group>
        </Modal>
    )
}

export default DeleteConfirm
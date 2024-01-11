import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button } from '@chakra-ui/react'
import React from 'react'

const DeleteModal = ({ isOpen, onOpen, onClose, handleDelete }) => {

    return (
        <>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Confirm Delete</ModalHeader>
                    <ModalBody>
                        <p>Are you sure you want to delete this post?</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={handleDelete}>
                            Confirm
                        </Button>
                        <Button ml={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DeleteModal;

import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ChangeProfilePhotoModal = ({isOpen, onOpen, onClose, handleProfileImageChange}) => {
  return (
    <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Profile Image</ModalHeader>
                
                <ModalBody>
                    <div className='flex flex-col items-center'>
                        <label for="profileImage" className='font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full'>Upload Photo</label>
                        <input onChange={handleProfileImageChange} type="file" name="profileImage" id="profileImage" />
                    </div>
                    <hr />
                    <p className='font-bold py-3 text-red-600 text-center'>Remove Photo</p>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  );
};

export default ChangeProfilePhotoModal
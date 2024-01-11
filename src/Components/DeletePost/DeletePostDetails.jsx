import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import DeleteModal from './DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction } from '../../Redux/Post/Action';

const DeletePostDetails = ({post}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {user} = useSelector((store) => store)
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const toast = useToast();

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDeleteClick = () => {
        if (post.user?.id === user.reqUser.id) {
            onOpen();
        } else {
            toast({
                title: "Invalid operation...",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };
    

    const handleDelete = () => {
        const data = { jwt:token, postId:post?.id, userId:user.reqUser?.id };
        dispatch(deletePostAction(data));
        toast({
            title:"Post Deleted...",
            status:"success",
            duration:2000,
            isClosable:true,
        });
        onClose();
        setTimeout(() => {
            location.reload();
        }, 1000);
    };

    return (
        <div>
            <div className='dropdown'>
                <BsThreeDots className='dots' onClick={handleClick} />
                <div className='dropdown-content'>
                    {showDropdown && (
                        <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer' onClick={handleDeleteClick}>
                            Delete
                        </p>
                    )}
                </div>
            </div>
            <DeleteModal onClose={onClose} isOpen={isOpen} handleDelete={handleDelete} />
        </div>
    )
}

export default DeletePostDetails
import { useToast } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeRight = () => {
  const {user, auth} = useSelector((store) => store)
  const navigate = useNavigate();
  const toast = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    toast({
      title: 'Logout successful',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div>
      <div>
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
                <div>
                    <img className='w-12 h-12 rounded-full' src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                </div>
                <div className='ml-3'>
                    <p>{user.reqUser?.name}</p>
                    <p className='opacity-70 '>{user.username}</p>
                </div>
            </div>
            <div>
                <p className='text-red-500 font-semibold cursor-pointer' onClick={handleLogout}>Log out</p>  
            </div>            
        </div>
      </div>
    </div>
  )
}

export default HomeRight
import { Button, FormControl, FormHelperText, FormLabel, Input, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { editUserAction, getUserProfileAction } from '../../Redux/User/Action';
import { uploadToCloudnary } from '../../Config/UploadToCloudnary';
import ChangeProfilePhotoModal from './ChangeProfilePhotoModal';
import { useNavigate } from 'react-router-dom';

const EditAccountDetails = () => {
  const [imageFile, setImageFile] = useState(null);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [initialValues, setInitialValues] = useState ({
    name:"",
    username:"",
    email:"",
    bio:"",
    mobile:"",
    gender:"",
    website:"",
  });

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);

  useEffect(() => {
    console.log("reqUser: ", user.reqUser);
    const newValue = {};

    for (let item in initialValues) {
        if (user.reqUser && user.reqUser[item]) {
            newValue[item] = user.reqUser[item];
        }
    }
    formik.setValues(newValue);
  },[user.reqUser]);

  const formik = useFormik({
    initialValues:{...initialValues},
    onSubmit: (values) => {
        const data = {
            jwt:token,
            data:{...values, id:user.reqUser?.id},
        };
        dispatch(editUserAction(data)); 
        toast({
            title:"Account updated...",
            status:"success",
            duration:5000,
            isClosable:true,
        });
        navigate(`/${user.reqUser?.username}`);
    },
  });

  async function handleProfileImageChange(event) {
    const selectedFile = event.target.files[0];
    const image = await uploadToCloudnary(selectedFile);
    setImageFile(image);
    const data = {
        jwt:token,
        data: {image, id:user.reqUser?.id},
    };
    dispatch(editUserAction(data)); 
    onClose();
  }

  return (
    <div className='border rounded-md p-10 lg:px-40'>
        <div className='flex pb-7'>
            <div className='w-[15%]'>
                <img className='w-8 h-8 rounded-full' src={imageFile || user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
            </div>

            <div>
                <p>{user.reqUser?.username}</p>
                <p onClick={onOpen} className='font-bold text-blue-800 cursor-pointer'>Change Profile Photo</p>
            </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
            <Stack spacing="6">
                <FormControl className='flex' id="name">
                    <FormLabel className='w-[15%]'>Name</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Name' className='w-full' type='text' {...formik.getFieldProps("name")} />
                        <FormHelperText className='text-xs'>
                            Help people discover your account by using the name you're known 
                            by: either your full name, nickname or business name.
                        </FormHelperText>
                    </div>
                </FormControl>
                <FormControl className='flex' id="username">
                    <FormLabel className='w-[15%]'>Username</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Username' className='w-full' type='text' {...formik.getFieldProps("username")} />
                        <FormHelperText className='text-xs'>
                            Choose a username that reflects your identity and is not already in use by another user.
                        </FormHelperText>
                    </div>
                </FormControl>
                <FormControl className='flex' id="website">
                    <FormLabel className='w-[15%]'>Website</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Website' className='w-full' type='text' {...formik.getFieldProps("website")} />
                        <FormHelperText className='text-xs'>
                            Editing your links is only available on mobile. Visit the
                            SnapStory app and edit your profile to change the websites in
                            your bio
                        </FormHelperText>
                    </div>
                </FormControl>
                <FormControl className='flex' id="bio">
                    <FormLabel className='w-[15%]'>Bio</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Bio' className='w-full' type='text' {...formik.getFieldProps("bio")} />
                    </div>
                </FormControl>

                <div className='py-10'>
                    <p className='font-bold text-sm'>Personal information</p>
                    <p className='text-xs'>
                        Provide your personal information, even if the account is used for 
                        a business, a pet or something else. This won't be a part of your 
                        public profile.
                    </p>
                </div>

                <FormControl className='flex' id="email">
                    <FormLabel className='w-[15%]'>Email address</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Email' className='w-full' type='email' {...formik.getFieldProps("email")} />
                    </div>
                </FormControl>
                <FormControl className='flex' id="mobile">
                    <FormLabel className='w-[15%]'>Phone number</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Phone' className='w-full' type='tel' {...formik.getFieldProps("mobile")} />
                    </div>
                </FormControl>
                <FormControl className='flex' id="gender">
                    <FormLabel className='w-[15%]'>Gender</FormLabel>
                    <div className='w-full'>
                        <Input placeholder='Gender' className='w-full' type='text' {...formik.getFieldProps("gender")} />
                    </div>
                </FormControl>

                <div>
                    <Button colorScheme='blue' type='submit' >
                        Submit
                    </Button>
                </div>
            </Stack>
        </form>

        <ChangeProfilePhotoModal handleProfileImageChange={handleProfileImageChange} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
    </div>
  );
};

export default EditAccountDetails
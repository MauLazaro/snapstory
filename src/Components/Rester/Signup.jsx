import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signupAction } from '../../Redux/Auth/Action'
import * as Yup from "yup"

const validationShema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is Required"),
    password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is Required"),
});

const Signup = () => {
  const initialValues = {email:"", username:"", name:"", password:""};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const {auth} = useSelector(store=>store);


  const handleNavigate = () => navigate("/login");
  const handleSubmit = (values, actions) => {
    dispatch(signupAction(values));
    actions.setSubmitting(false);
  };
  
  useEffect(() => {
    if(auth.signup?.username) {
        navigate("/login")
        toast({
            title: `Account created. ${auth.signup?.username}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
    }
  },[auth.signup])

  return (
    <div>
        <div className='border '>
            <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <img className='mb-5' src="./../../src/assets/logo-letters.png" alt="" />
                <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationShema}>
                    {(formikProps) => (
                    <Form className='space-y-3'>
                        <Field name="email">
                            {({field, form}) => (
                            <FormControl isInvalid={form.errors.email && form.touched.email}>
                                <Input className="w-full" {...field} id='email' placeholder='Mobile Number or Email'>
                                </Input>
                                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>

                        <Field name="username">
                            {({field, form}) => (
                            <FormControl isInvalid={form.errors.username && form.touched.username}>
                                <Input className="w-full" {...field} id='username' placeholder='Username'>
                                </Input>
                                <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>

                        <Field name="name">
                            {({field, form}) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <Input className="w-full" {...field} id='name' placeholder='Full Name'>
                                </Input>
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>

                        <Field name="password">
                            {({field, form}) => (
                            <FormControl isInvalid={form.errors.password && form.touched.password}>
                                <Input className="w-full" {...field} id='password' placeholder='Password' type='password'>
                                </Input>
                                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>

                        <p className='text-center text-sm'>People who use our service may have uploaded your contact information to SnapStory. Learn more.</p>
                        <p className='text-center text-sm'>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>

                        <Button className='w-full' mt={4} colorScheme='blue' type='submit' isLoading={formikProps.isSubmitting}>
                            Sign Up
                        </Button>

                    </Form>
                    )}
                </Formik>
            </Box>
        </div>
        <div className='border w-full border-slate-300 mt-5'>
            <p className='text-center py-2 text-sm'>If you have account already <span onClick={handleNavigate} className='ml-2 text-blue-700 cursor-pointer'>Sign in</span></p>
        </div>
    </div>
  )
}

export default Signup
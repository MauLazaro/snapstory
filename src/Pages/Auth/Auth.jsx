import React from 'react'
import Signin from '../../Components/Rester/Signin';
import { useLocation } from 'react-router-dom';
import Signup from '../../Components/Rester/Signup';

const Auth = () => {
  const location = useLocation();

  return (
    <div className='flex items-center justify-center h-[100vh] space-x-5'>
        <div className='flex items-center justify-center h-[100vh]'>
            <div className='relative hidden lg:block'>
                <div className='h-[35.3rem] w-[30rem]'>
                    <img className='h-full w-full' src='https://i.ibb.co/7y43jzK/login-image.png' alt='phone-handler' />
                </div>
            </div>
            <div className='w-[40vw] lg:w-[35vw]'>
                {location.pathname==='/login' ? <Signin/> : <Signup />}
            </div>
        </div>
    </div>
    
  )
}

export default Auth
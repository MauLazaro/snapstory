import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from '../Home/Home'
import Profile from '../Profile/Profile'
import Auth from '../Auth/Auth'
import EditAccountDetails from '../../Components/EditAccount/EditAccountDetails'

const Router = () => {
  const location = useLocation();

  return (
    <>
        {(location.pathname !== "/login" && location.pathname !== "/signup") && (       
        <div className='flex'>
            <div className='w-[20%] border border-1-slate-500 '>
                <Sidebar/>
            </div>
            <div className='w-full'>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/:username' element={<Profile />}></Route> 
                    <Route path='/comment/:postId' element={<Home />}></Route>
                    <Route path='/account/edit' element={<EditAccountDetails />}></Route>  
                </Routes>
            </div>
        </div>
        )} {(location.pathname === "/login" || location.pathname === "/signup") && ( 
        <div>
            <Routes>
                <Route path='/signup' element={<Auth />}></Route>
                <Route path='/login' element={<Auth />}></Route>
            </Routes>
        </div>)}
    </>
  )
}

export default Router
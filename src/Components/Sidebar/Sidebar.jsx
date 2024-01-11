import React, { useState } from 'react'
import { IoReorderFour } from 'react-icons/io5'
import { menu } from './SidebarConfig'
import { useNavigate } from 'react-router-dom'
import CreatePostModal from '../Post/CreatePostModal'
import { useDisclosure } from '@chakra-ui/react'
import SearchComponents from '../SearchComponents/SearchComponents'
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [activeTab, setActiveTab] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user} = useSelector((store) => store);
    const navigate = useNavigate();

    const handleTabClick=(title) =>{
        setActiveTab(title)
        if (title==='Profile') {
            setIsSearchVisible(false); 
            navigate(`/${user.reqUser?.username}`);
        } else if (title==='Home') {
            setIsSearchVisible(false);  
            navigate('/');
        } else if (title==='Create') {
            setIsSearchVisible(false);  
            onOpen();
        }  else if (title==='Search') {
            setIsSearchVisible(true);
        } else {
            setIsSearchVisible(false); 
        }
    };
    
    return (
        <div className='sticky top-0 h-[100vh] flex'>
            <div className={`flex flex-col justify-between h-full ${activeTab==='Search'?'px-2':'px-10'}`}>
                {<div>
                    {activeTab !== 'Search' && <div className='pt-10'>
                        <img className='w-40' src='https://i.ibb.co/ynBN6pT/logo-letters.png' alt='Logo' />
                    </div>}

                    <div className='mt-10'>
                        {menu.map((item) => (
                            <div onClick={()=>handleTabClick(item.title)} className='flex items-center mb-5 cursor-pointer text-lg'>
                                {activeTab === item.title ? item.iactiveIcon : item.icon}
                                {activeTab !== 'Search' && <p className={`${activeTab === item.title ? 'font-bold' : 'font-medium'} `}>{item.title}</p>}
                            </div>
                        ))}
                    </div>
                </div>}

                <div className='flex items-center cursor-pointer pb-10'>
                    <IoReorderFour className='text-2x1' />
                    {activeTab !== 'Search' && <p className='ml-5'>More</p>}
                </div>
            </div>

            <CreatePostModal onClose={onClose} isOpen={isOpen} user={user} /> 
            {isSearchVisible && <SearchComponents />}
        </div>
    )
}

export default Sidebar
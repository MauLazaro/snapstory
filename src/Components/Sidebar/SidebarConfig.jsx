import { AiFillHome,  AiFillPlusCircle, AiOutlineHome, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { RiUserFill, RiUserLine } from 'react-icons/ri';

export const menu = [
    { title: "Home", icon: <AiOutlineHome className='text-2xl mr-5'/>, iactiveIcon: <AiFillHome className='text-2xl mr-5'/> },
    { title: "Search", icon: <AiOutlineSearch className='text-2xl mr-5'/>, iactiveIcon: <AiOutlineSearch className='text-2xl mr-5'/> }, 
    { title: "Create", icon: <AiOutlinePlusCircle className='text-2xl mr-5'/>, iactiveIcon: <AiFillPlusCircle className='text-2xl mr-5'/> },
    { title: "Profile", icon: <RiUserLine className='text-2xl mr-5'/>, iactiveIcon: <RiUserFill className='text-2xl mr-5'/> }
];


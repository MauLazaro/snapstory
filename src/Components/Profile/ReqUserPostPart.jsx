import React, { useEffect, useState } from 'react'
import { AiOutlineTable } from 'react-icons/ai'
import { BiBookmark } from 'react-icons/bi'
import ReqUserPostCard from './ReqUserPostCard'
import { useDispatch, useSelector } from 'react-redux'
import { reqUserPostAction } from '../../Redux/Post/Action'

const ReqUserPostPart = ({user}) => {
    const [activeTab, setActiveTab] = useState("Posts");
    const {post} = useSelector((store) => store);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    const tabs = [
        { tab: "Posts", icon: <AiOutlineTable />, activeTab: "" },
        { tab: "Saved", icon: <BiBookmark /> },
    ];

    useEffect(() => {
        if (user) {
            const data = {jwt:token, userId:user?.id};
            dispatch(reqUserPostAction(data));
        }
    }, [user, post.createdPost]);

    console.log("post: ",post);

    return (
        <div>
            <div className='flex space-x-14 border-t relative'>
                {tabs.map((item) =>
                    <div onClick={() => setActiveTab(item.tab)} className={`${activeTab === item.tab ? "border-t border-black font-bold" : "opacity-60"} flex items-center cursor-pointer py-2 text-sm`}>
                        <p>{item.icon}</p>
                        <p className='ml-1'>{item.tab}</p>
                    </div>)}
            </div>

            <div className='flex flex-wrap'>
                {activeTab==="Posts" && !post.reqUserPost?.message ? post?.reqUserPost?.map((item) => <ReqUserPostCard post={item}/>):user?.savedPost.map((item) =><ReqUserPostCard post={item}/>)}
            </div>
        </div>
    )
}

export default ReqUserPostPart
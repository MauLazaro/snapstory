import './PostCard.css'
import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { likePostAction, savePostAction, unlikePostAction, unsavePostAction } from '../../Redux/Post/Action'
import { isPostLikedByUser, isSavedPost } from '../../Config/Logics'
import { useNavigate } from 'react-router-dom'
import DeletePostDetails from '../DeletePost/DeletePostDetails'
import CommentModal from '../Comment/CommentModal'

const PostCard = ({post}) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isPostLike, setIsPostLike] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {user} = useSelector((store) => store)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const data = {jwt:token, postId:post?.id};

    const handleSave = () => {
        setIsSaved(true);
        dispatch(savePostAction(data));
    };

    const handleUnSave = () => {
        setIsSaved(false);
        dispatch(unsavePostAction(data));
    };

    const handlePostLike = () => {
        setIsPostLike(true);
        dispatch(likePostAction(data));
    };

    const handlePostUnLike = () => {
        setIsPostLike(false);
        dispatch(unlikePostAction(data));
    };

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOpenModal = () => {
        navigate(`/comment/${post.id}`);
        onOpen();
    };

    const handleCloseModal = () => {
        navigate("/");
        onClose()
    };

    useEffect(() => {
        setIsPostLike(isPostLikedByUser(post, user.reqUser?.id));
        setIsSaved(isSavedPost(user.reqUser, post.id));
    },[post.likedByUsers, user.reqUser]);

    return (
        <div >
            <div className='border rounded-md w-full'>
                <div className='flex justify-between items-center w-full py-4 px-5'>
                    <div className='flex items-center'>
                        <img className='h-12 w-12 rounded-full' src={post.user.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                        <div className='pl-2'>
                            <p className='font-semibold text-sm item '>{post?.user.username}</p>
                            <p className='font thin text-sm'>{post.location}</p>
                        </div>
                    </div>

                    <DeletePostDetails post={post} />

                </div>

                <div className='w-full'>
                    <img className='w-full cursor-pointer' src={post?.image} onClick={handleOpenModal} />
                </div>

                <div className='flex justify-between items-center w-full px-5 py-4'>
                    <div className='flex items-center space-x-2'>
                        {isPostLike ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostUnLike} /> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />}
                        
                        <FaRegComment onClick={handleOpenModal} className='text-xl hover:opacity-50 cursor-pointer' />
                        <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer' />
                    </div>
                    <div className='cursor-pointer'>
                        {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnSave} /> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSave} /> }   
                    </div>
                </div>

                <div className='w-full py-2 px-5'>
                    {post?.likedByUsers?.length > 0 && <p>{post?.likedByUsers?.length} Likes</p>}
                    {post.comments.length > 0 && <p onClick={handleOpenModal} className='opacity-50 py-2 cursor-pointer'>View all {post?.comments?.length} comments</p>}
                </div>

            </div>

            <CommentModal handlePostLike={handlePostLike} onClose={handleCloseModal} isOpen={isOpen} handleSave={handleSave} isPostLike={isPostLike} isSaved={isSaved} handlePostUnLike={handlePostUnLike} handleUnSave={handleUnSave} />
        </div>
    )
}

export default PostCard
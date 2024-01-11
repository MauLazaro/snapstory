import './CommentModal.css'
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import CommentCard from './CommentCard'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { createCommentAction } from '../../Redux/Comment/Action'
import { useParams } from 'react-router-dom'
import { findPostByIdAction } from '../../Redux/Post/Action'
import { timeDifference } from '../../Config/Logics'

const CommentModal = ({ onClose, isOpen, isSaved, isPostLike, handlePostLike, handleSave , handlePostUnLike, handleUnSave}) => {
    const [commentContent, setCommentContent] = useState();
    const {comment, post, user} = useSelector((store) => store); 
    const {postId} = useParams();
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    useEffect(() => {
        const data = {jwt:token, postId};
        if (postId) {
            dispatch(findPostByIdAction(data));
        }
    }, [comment.createdComment, postId, comment.likeComment]);

    return (
        <div>
            <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className='flex h-[75vh]'>
                            <div className='w-[45%] flex flex-col justify-center'>
                                <img className='max-h-full max-w-full' src={post.singlePost?.image} alt="" />
                            </div>
                            <div className='w-[55%] pl-6 relative'>
                                <div className='flex justify-between items-center py-5'>
                                    <div className='flex items-center'>
                                        <div>
                                            <img className='w-9 h-9 rounded-full' src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
                                        </div>
                                        <div className='ml-2'>
                                            <p>{user.reqUser?.username}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <BsThreeDots />
                                    </div>
                                    
                                </div>
                                <hr />
                                <div className='comment'>
                                    {post.singlePost?.comments?.map((item) => <CommentCard comment={item}/>)}
                                </div>

                                <div className='absolute bottom-0 w-[90%]'>
                                    <div className='flex justify-between items-center w-full py-2.5 bg-opacity-20 bg-slate-50'>
                                        <div className='flex items-center space-x-2'>
                                            {isPostLike ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostUnLike} /> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />}
                                            
                                            <FaRegComment className='text-xl hover:opacity-50 cursor-pointer' />
                                            <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer' />
                                        </div>
                                        <div className='cursor-pointer'>
                                            {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnSave} /> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSave} /> }   
                                        </div>
                                    </div>

                                    <div className='w-full py-2'>
                                        {post.singlePost?.likedByUsers.length > 0 && <p>{post.singlePost?.likedByUsers.length} Likes</p>}
                                        <p className='opacity-50 text-sm'>{timeDifference(post.singlePost?.createdAt)}</p>
                                    </div>

                                    <div className='flex items-center w-full'>
                                        <BsEmojiSmile className=''/>
                                        <input className='commentInput' type="text" placeholder='Add a comment...' value={commentContent} onChange={(e) => setCommentContent(e.target.value)} onKeyPress={(e) => {
                                            if (e.key == "Enter") {
                                                const data = {
                                                    postId,
                                                    jwt:token,
                                                    data:{
                                                        content:commentContent,
                                                    },
                                                };
                                                dispatch(createCommentAction(data));
                                                setCommentContent("");
                                            }
                                        }} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </ModalBody>

                </ModalContent>
            </Modal>
        </div>
    )
}

export default CommentModal
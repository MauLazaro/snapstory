import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { followUserAction, getUserProfileAction, unfollowUserAction } from '../../Redux/User/Action';
import { useToast } from '@chakra-ui/react';

export const ProfileUserDetails = ({user, isFollowing,isReqUser}) => {
  const {post} = useSelector((store) => store);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);


  const handleFollowClick = () => {
    const data = {
        jwt:token,
        userId:user?.id,
    }
    try {
        if (isFollowing) {
            dispatch(unfollowUserAction(data));
            toast({
                title: "You are unfollowed this user",
                status: "info",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            dispatch(followUserAction(data));
            toast({
                title: "You are followed this user",
                status: "info",
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (error) {
        console.error("Catch error:", error);
    }
  };


  return (
    <div className='py-10 w-full'>
        <div className='flex items-center'>
            <div className='w-[15%]'> 
                <img className='w-32 h-32 rounded-full ' src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" />
            </div>

            <div className='space-y-5 pl-5'>
            <div className='flex space-x-10 items-center'>
                <p>{user?.username}</p>
                {isReqUser ? (
                <button onClick={() => navigate("/account/edit")}>Edit Profile</button>
                ) : (
                <button onClick={handleFollowClick}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                )}
            </div>

                <div className='flex space-x-10'>
                    <div>
                        <span className='font-semibold mr-2'>{post.reqUserPost?.length}</span>
                        <span>Posts</span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2'>{user?.follower.length}</span>
                        <span>Followers</span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2'>{user?.following.length}</span>
                        <span>Following</span>
                    </div>
                </div>

                <div>
                    <p className='font-semibold'>{user?.name}</p>
                    <p className='font-thin text-sm'>{user?.bio}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

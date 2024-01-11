import React, { useEffect } from 'react'
import { ProfileUserDetails } from '../../Components/Profile/ProfileUserDetails'
import ReqUserPostPart from '../../Components/Profile/ReqUserPostPart'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findUserByUsernameAction, getUserProfileAction } from '../../Redux/User/Action'
import { isFollowing, isReqUser } from '../../Config/Logics'

const Profile = () => {
  const {username} = useParams();
  const {user} = useSelector((store) => store)
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const isRequser = isReqUser(user.reqUser?.id, user.findByUsername?.id);
  const isFollowed = isFollowing(user.reqUser, user.findByUsername);

  useEffect(() => {
    const data ={
      jwt:token,
      username
    }
    dispatch(getUserProfileAction(token));
    dispatch(findUserByUsernameAction(data));
  }, [username, user.follower, user.following]);

  return (
    <div className='px-20'>
        <div>
            <ProfileUserDetails user={isRequser?user.reqUser:user.findByUsername} isFollowing={isFollowed} isReqUser={isRequser} />
        </div>
        <div>
            <ReqUserPostPart user={isRequser?user.reqUser:user.findByUsername} />
        </div>
    </div>
  )
}

export default Profile
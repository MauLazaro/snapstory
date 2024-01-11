import React, { useEffect, useState } from 'react'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Post/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { findAllPostAction, findUserPostAction } from '../../Redux/Post/Action'
import { findUserByUserIdsAction, getUserProfileAction } from '../../Redux/User/Action'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [userIds, setUserIds] = useState([]);
  const {user, post} = useSelector((store) => store);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id);
    if (newIds?.length > 0) {
      setUserIds([user.reqUser?.id, ...newIds]);
    }
    else {
      setUserIds([user.reqUser?.id]);
      navigate('/login');
    }
  }, [user.reqUser]);  

  useEffect(() => {
    const data = {
      jwt:token,
      userIds:[userIds].join(','),
    };
    dispatch(findAllPostAction(token));
    dispatch(findUserPostAction(data));
    dispatch(findUserByUserIdsAction(data));
  },[token, userIds, post.createdPost, post.deletedPost]);

  useEffect(() => {
    dispatch(getUserProfileAction(token));
  }, [token]);


  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[44%] px-10'>

        <div className='space-y-10 w-full pb-14'>
            {post.allPost.length > 0 &&
              post.allPost
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((item) => <PostCard post={item} />)}
          </div>
        </div>

        <div className='w-[27%]'>
            <HomeRight />
        </div>

      </div>
    </div>
  )
}

export default Home
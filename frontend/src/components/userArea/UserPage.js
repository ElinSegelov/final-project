/* eslint-disable no-unused-vars */
import EventCalender from 'components/EventCalender';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import DashBoard from './DashBoard';
import UserProfileCard from './UserProfileCard';

const UserPage = () => {
  const accessToken = useSelector((store) => store.users.user.accessToken);
  const navigate = useNavigate();
  const username = useSelector((store) => store.users.username)
  // This will prevent to access personal page if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate])

  return (
    <>
      <div>Welcome {username}</div>
      <UserProfileCard />
      <DashBoard />
    </>
  )
}

export default UserPage
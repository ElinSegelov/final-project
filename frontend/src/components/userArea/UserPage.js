/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

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
      <div>Welcome back {username}</div>
      <EventCard />
    </>
  )
}

export default UserPage
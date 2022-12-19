/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const accessToken = useSelector((store) => store.users.accessToken);
  const navigate = useNavigate();

  // This will prevent to access personal page if not authenticated
  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate])

  const username = useSelector((store) => store.users.username)
  return (
    <div>Welcome back {username}</div>
  )
}

export default UserPage
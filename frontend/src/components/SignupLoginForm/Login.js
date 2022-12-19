/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import users from 'reducers/user';
import { useNavigate } from 'react-router-dom';
import { Form, FormWrapper } from './Register';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((store) => store.users.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate('/userpage');
    }
  }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL('login'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(users.actions.setUserName(data.response.username));
            dispatch(users.actions.setUserId(data.response.userId));
            dispatch(users.actions.setAccessToken(data.response.accessToken));
            dispatch(users.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(users.actions.setUserName(null));
            dispatch(users.actions.setUserId(null));
            dispatch(users.actions.setAccessToken(null));
            dispatch(users.actions.setError(data.response));
          });
        }
      })
  }
  return (
    <FormWrapper>
      <Form onSubmit={onFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In!</button>
      </Form>
    </FormWrapper>
  )
}

export default Login
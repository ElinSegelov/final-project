/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormWrapper } from 'styles/Forms';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const userId = useSelector((store) => store.user.userInfo.userId);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  useEffect(() => {
    if (loggedInUser || accessToken) {
      navigate(`/user/${userId}`);
    }
  }, [loggedInUser, navigate, userId, accessToken])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }
    fetch(API_URL('login'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserInfo(data.response))
            dispatch(user.actions.setError(null));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserInfo(null))
            dispatch(user.actions.setError(data.response));
          });
        }
      })
  }
  return (
    <FormWrapper>
      <Form onSubmit={onFormSubmit}>
        <h2>Login</h2>
        <label htmlFor="username" />
        <input
          placeholder="Username"
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password" />
        <input
          placeholder="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Log In!</button>
      </Form>
      <Link to="/register">Not a user? Register here!</Link>
    </FormWrapper>
  )
}

export default Login
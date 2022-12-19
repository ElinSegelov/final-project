/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import users from 'reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FormWrapper, Form, Input } from 'styles/Forms';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const accessToken = useSelector((store) => store.user.accessToken);

  // useEffect(() => {
  //   if (accessToken) {
  //     navigate('/userpage');
  //   }
  // }, [accessToken, navigate])

  const onFormSubmit = (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    }
    fetch(API_URL('register'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(users.actions.setUserName(data.response.username));
            dispatch(users.actions.setUserId(data.response.userId));
            dispatch(users.actions.setAccessToken(data.response.accessToken));
            dispatch(users.actions.setError(null));
            navigate('/userpage')
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
        <h2>Sign Up</h2>
        <label htmlFor="username" />
        <input
          placeholder="Username*"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password" />
        <input
          placeholder="Password*"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="email" />
        <input
          placeholder="Email Address*"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <div>
          <button type="submit">Sign Up!</button>
        </div>
      </Form>
      <Link to="/login">Already a user? Login here!</Link>
    </FormWrapper>
  )
}

export default Register;


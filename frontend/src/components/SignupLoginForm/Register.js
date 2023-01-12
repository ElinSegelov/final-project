/* eslint-disable no-unused-expressions */
/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { FormWrapper, Form, Input } from 'styles/Forms';
import Swal from 'sweetalert2';
import { Button1 } from 'styles/Button.styles';
import ui from 'reducers/ui';
import { LoadingBlurBackground } from 'components/loaders/loadingAnimations';
import { swalBlurBackground } from 'utils/sweetAlerts';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatePassword, setRepeatePassword] = useState('');
  const [email, setEmail] = useState('');
  const userId = useSelector((store) => store.user.userInfo.userId);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  const isLoading = useSelector((store) => store.ui.isLoading)

  useEffect(() => {
    if (loggedInUser || accessToken) {
      navigate(`/user/${userId}`);
    }
  }, [loggedInUser, accessToken, navigate, userId])

  const handleValidationErrors = (data) => {
    if (password.length < 8) {
      swalBlurBackground('Password must be at least 8 characters')
      setPassword('')
      setRepeatePassword('')
    } else if (data.response.keyValue.username === username) {
      swalBlurBackground('This username already exist')
      setUsername('')
    } else if (data.response.keyValue.email === email) {
      swalBlurBackground('This email already exist')
      setEmail('')
    } else {
      setPassword('')
      setUsername('')
      setEmail('')
      swalBlurBackground('Sorry, something went wrong')
    }
  }

  const onFormSubmit = (event) => {
    dispatch(ui.actions.setLoading(true))
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    }
    if (password === repeatePassword) {
      fetch(API_URL('register'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setUserInfo(data.response))
              dispatch(user.actions.setError(null));
            });
            navigate(`/user/${userId}`)
          } else {
            batch(() => {
              dispatch(user.actions.setUserInfo({}))
              dispatch(user.actions.setError(data.response));
              handleValidationErrors(data)
            });
          }
        })
        .finally(() => dispatch(ui.actions.setLoading(false)))
    } else if (password !== repeatePassword) {
      swalBlurBackground('Passwords are not equal')
      dispatch(ui.actions.setLoading(false))
    }
  }
  return (
    <div>
      {isLoading
        ? <LoadingBlurBackground />
        :
        <FormWrapper>
          <Form onSubmit={onFormSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor="username" />
            <input
              required
              placeholder="Username*"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password" />
            <input
              required
              placeholder="Password*"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="repeatePassword" />
            <input
              required
              placeholder="Confirm your password*"
              type="password"
              id="repeatePassword"
              value={repeatePassword}
              onChange={(e) => setRepeatePassword(e.target.value)} />
            <label htmlFor="email" />
            <input
              required
              placeholder="Email Address*"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <div>
              <Button1 type="submit">Sign Up!</Button1>
            </div>
          </Form>
          <Link to="/login">Already a user? Login here!</Link>
        </FormWrapper>}
    </div>
  )
}

export default Register;


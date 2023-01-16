/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import { FormWrapper, Form, Input } from 'styles/Forms';
import { FormWrapperContainer } from 'styles/Containers';
import { Button1 } from 'styles/Button.styles';
import { LoadingBlurBackground } from 'components/loaders/loadingAnimations';
import { swalBlurBackground } from 'utils/sweetAlerts';
import user from 'reducers/user';
import ui from 'reducers/ui';
import styled from 'styled-components/macro';

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
    <FormWrapperContainer>
      {isLoading
        ? <LoadingBlurBackground />
        :
        <FormWrapperRegister>
          <Form onSubmit={onFormSubmit}>
            <h2>Register</h2>
            <label htmlFor="email" />
            <Input
              required
              placeholder="Email Address*"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="username" />
            <Input
              required
              placeholder="Username*"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="password" />
            <Input
              required
              placeholder="Password*"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="repeatePassword" />
            <Input
              required
              placeholder="Confirm your password*"
              type="password"
              id="repeatePassword"
              value={repeatePassword}
              onChange={(e) => setRepeatePassword(e.target.value)} />
            <div>
              <RegisterButton type="submit">Register</RegisterButton>
            </div>
          </Form>
          <Link to="/login"><p>Already a user? <span>Login here</span></p></Link>
        </FormWrapperRegister>}
    </FormWrapperContainer>
  )
}

export default Register;

const RegisterButton = styled(Button1)`
  width: 12rem;
  margin: 0.5rem 0 0 0;
`
const FormWrapperRegister = styled(FormWrapper)`
  p {
    width: 12rem;
    font-size: 14px; 
    text-align: center;
  }
  span {
    text-decoration: underline;
    color: var(--orangeRed)
  }
`


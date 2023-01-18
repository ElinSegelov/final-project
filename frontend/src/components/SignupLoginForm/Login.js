/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, batch, useSelector } from 'react-redux';
import user from 'reducers/user';
import { API_URL } from 'utils/utils';
import { Form, FormWrapper, Input } from 'styles/Forms';
import { FormWrapperContainer } from 'styles/Containers';
import { FilledButton } from 'styles/Button.styles';
import { LoadingBlurBackground } from 'components/loaders/loadingAnimations';
import { swalBlurBackground } from 'utils/sweetAlerts';
import events from 'reducers/events';
import styled from 'styled-components/macro';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const userId = useSelector((store) => store.user.userInfo.userId);
  const isLoading = useSelector((store) => store.ui.isLoading)
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  useEffect(() => {
    if (loggedInUser || accessToken) {
      navigate(`/user/${userId}`);
    }
  }, [loggedInUser, navigate, userId, accessToken])

  const handleValidation = (data) => {
    setEmail('')
    setPassword('')
    swalBlurBackground(data.response, 2000)
  }
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
            dispatch(events.actions.setHostingEvents(data.response.hostingEvents))
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserInfo({}))
            dispatch(user.actions.setError(data.response))
            handleValidation(data)
          });
        }
      }).catch((error) => {
        console.error(error)
        swalBlurBackground('Something went wrong. Please try again later', 2200)
      })
  }
  return (
    <FormWrapperContainer>
      {isLoading
        ? <LoadingBlurBackground />
        :
        <FormWrapper>
          <Form onSubmit={onFormSubmit}>
            <h2>Login</h2>
            <label htmlFor="email" />
            <Input
              required
              placeholder="E-mail"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password" />
            <Input
              required
              placeholder="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <LoginButton type="submit">Log In</LoginButton>
          </Form>
          <Link to="/register"><p>Not a user? <span>Register here</span></p></Link>
        </FormWrapper>}
    </FormWrapperContainer>
  )
}

export default Login;

const LoginButton = styled(FilledButton)`
  width: 12rem;
  margin: 0.5rem 0 0 0;
`
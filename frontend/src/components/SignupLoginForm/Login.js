/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react'
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/utils';
import user from 'reducers/user';
import { useNavigate, Link } from 'react-router-dom';
import { Form, FormWrapper, Input } from 'styles/Forms';
import { FormWrapperContainer } from 'styles/Containers';
import { Button1 } from 'styles/Button.styles';
import Swal from 'sweetalert2';
import ui from 'reducers/ui';
import { LoadingBlurBackground } from 'components/loaders/loadingAnimations';
import events from 'reducers/events';
import { swalBlurBackground } from 'utils/sweetAlerts';
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

  const handleValidationErrors = (data) => {
    setEmail('')
    setPassword('')
    swalBlurBackground(data.response)
  }
  const onFormSubmit = (event) => {
    dispatch(ui.actions.setLoading(true))
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
            handleValidationErrors(data)
          });
        }
      })
      .finally(() => dispatch(ui.actions.setLoading(false)))
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

const LoginButton = styled(Button1)`
  width: 12rem;
  margin: 0.5rem 0 0 0;
`
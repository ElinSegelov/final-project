/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import { useDispatch, batch, useSelector } from 'react-redux';
import { API_URL } from 'utils/urls';
import { Link, useNavigate } from 'react-router-dom';
import { FormWrapper, Form, Input, ScreenReaderLabel } from 'styles/Forms';
import { FormWrapperContainer } from 'styles/Containers';
import { FilledButton } from 'styles/Button.styles';
import { LoadingBlurBackground } from 'components/loaders/loadingAnimations';
import { swalInformation } from 'utils/sweetAlerts';
import user from 'reducers/user';
import ui from 'reducers/ui';
import styled from 'styled-components/macro';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const userId = useSelector((store) => store.user.userInfo.userId);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isLoading = useSelector((store) => store.ui.isLoading);

  useEffect(() => {
    if (loggedInUser || accessToken) {
      navigate(`/user/${userId}`);
    }
  }, [loggedInUser, accessToken, navigate, userId]);

  const handleValidation = (data) => {
    if (password.length < 8) {
      swalInformation('Password must be at least 8 characters', '', 'warning', 2500)
      setPassword('');
      setRepeatPassword('');
    } else if (username.length < 2 || username.length > 10) {
      swalInformation('Username must be between 2 and 10 characters', '', 'warning', 2500)
      setUsername('');
    } else if (data.response.keyValue.username === username) {
      swalInformation('This username already exist', '', 'warning', 2500)
      setUsername('');
    } else if (data.response.keyValue.email === email) {
      swalInformation('This email already exist', '', 'warning', 2500)
      setEmail('');
    } else {
      swalInformation('Something went wrong.', 'Please try again later', 'error', 2500)
    }
  };

  const onFormSubmit = (event) => {
    dispatch(ui.actions.setLoading(true))
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    };
    if (password === repeatPassword) {
      fetch(API_URL('register'), options)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            batch(() => {
              dispatch(user.actions.setUserInfo(data.response));
              dispatch(user.actions.setError(null));
            });
            navigate(`/user/${userId}`);
          } else {
            batch(() => {
              dispatch(user.actions.setUserInfo({}));
              dispatch(user.actions.setError(data.response));
              handleValidation(data);
            });
          }
        })
        .catch((error) => {
          console.error(error.stack)
          swalInformation('Something went wrong.', 'Please try again later', 'error', 2500)
        })
        .finally(() => dispatch(ui.actions.setLoading(false)))
    } else if (password !== repeatPassword) {
      swalInformation('Passwords are not equal', '', 'warning', 2500);
      dispatch(ui.actions.setLoading(false));
    }
  };
  return (
    <FormWrapperContainer>
      {isLoading
        ? <LoadingBlurBackground />
        :
        <FormWrapperRegister>
          <Form onSubmit={onFormSubmit}>
            <h2>Register</h2>
            <ScreenReaderLabel htmlFor="email">E-mail</ScreenReaderLabel>
            <Input
              required
              placeholder="Email Address *"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <ScreenReaderLabel htmlFor="username">Username</ScreenReaderLabel>
            <Input
              required
              placeholder="Username *"
              minLength={2}
              maxLength={10}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <ScreenReaderLabel htmlFor="password">Password</ScreenReaderLabel>
            <Input
              required
              placeholder="Password *"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <ScreenReaderLabel htmlFor="confirm-password">Confirm password</ScreenReaderLabel>
            <Input
              required
              placeholder="Confirm your password *"
              type="password"
              id="confirm-password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)} />
            <div>
              <RegisterButton type="submit">Register</RegisterButton>
            </div>
          </Form>
          <Link to="/login"><p>Already a user? <span>Login here</span></p></Link>
        </FormWrapperRegister>}
    </FormWrapperContainer>
  );
};

export default Register;

const RegisterButton = styled(FilledButton)`
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


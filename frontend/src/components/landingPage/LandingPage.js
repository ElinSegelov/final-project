/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import styled from 'styled-components/macro';
import EventCalendar from 'components/EventCalendar';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';
import EventCardContainer from 'components/userDashboard/events/EventCardContainer';
import { useSelector } from 'react-redux';
import { LoadingBlurBackground } from 'components/loaders/loadingAnimations';
import { Button1, ButtonReversed } from 'styles/Button.styles';
import heroImage from '../../assets/images/hero.jpg';
import Tutorial from './Tutorial';

const LandingPage = () => {
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  return (
    <>
      <Tutorial />
      <EventCalendar />
      <EventCardContainer />
      {!accessToken
        ?
        <RegisterLoginWrapper>
          <Link to="/login"><LoginButton>Log in</LoginButton></Link>
          <Link to="/register"><RegisterButton>Register</RegisterButton></Link>
        </RegisterLoginWrapper> : null}
    </>
  )
}

export default LandingPage

const RegisterLoginWrapper = styled.div`
  
`
const LoginButton = styled(ButtonReversed)`
  width: 6rem;
`
const RegisterButton = styled(Button1)`
  width: 6rem;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const RegisterLink = styled(StyledLink)`
  color: red;
`
const LoginLink = styled(StyledLink)`

`
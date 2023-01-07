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
import heroImage from '../../assets/images/hero.jpg';
import Tutorial from './Tutorial';

const LandingPage = () => {
  const isLoading = useSelector((store) => store.ui.isLoading)
  return (
    <div>
      {isLoading
        ? <LoadingBlurBackground />
        :
        <>
          <HeroImage src={heroImage} alt="Hero Octahedron" />
          <Tutorial />
          <EventCalendar />
          <EventCardContainer />
          <RegisterLink to="/register">Sign up</RegisterLink>
          <LoginLink to="/login">Log in</LoginLink>
        </>}
    </div>
  )
}

export default LandingPage

const HeroImage = styled.img`
  width: 100%;
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
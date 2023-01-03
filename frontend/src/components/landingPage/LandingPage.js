/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import styled from 'styled-components';
import EventCalendar from 'components/EventCalendar';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';
import heroImage from '../../assets/images/hero.jpg';
import Tutorial from './Tutorial';

const LandingPage = () => {
  return (
    <>
      <HeroImage src={heroImage} alt="Hero Octahedron" />
      <Tutorial />
      <EventCalendar />
      <RegisterLink to="/register">Sign up</RegisterLink>
      <LoginLink to="/login">Log in</LoginLink>
      <Footer />
    </>
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
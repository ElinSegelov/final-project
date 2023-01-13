/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import styled from 'styled-components/macro';
import EventCalendar from 'components/EventCalendar';
import { Link } from 'react-router-dom';
import EventCardContainer from 'components/userDashboard/events/EventCardContainer';
import { InnerWrapper } from 'styles/Containers';
import { useSelector } from 'react-redux';
import { Button1, ButtonReversed } from 'styles/Button.styles';
import Tutorial from './Tutorial';

const LandingPage = () => {
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  return (
    <LandingpageInnerWrapper>
      <Tutorial />
      <CalendarAndEvents>
        <EventCalendar />
        <EventCardContainer unAutohrized />
      </CalendarAndEvents>
      {!accessToken
        ?
        <RegisterLoginWrapper>
          <Link to="/login"><LoginButton>Log in</LoginButton></Link>
          <Link to="/register"><RegisterButton>Register</RegisterButton></Link>
        </RegisterLoginWrapper> : null}
    </LandingpageInnerWrapper>
  )
}

export default LandingPage

const LandingpageInnerWrapper = styled(InnerWrapper)`
  min-height: 100vh;
  position: relative;
`

const CalendarAndEvents = styled.div`
@media (min-width: 1024px) {
    //max-width: 35rem;   
  }
`
const RegisterLoginWrapper = styled.div`
  @media (min-width: 1024px) {
    position: absolute;
    bottom: 0rem;
    right: 0;
    padding: 
    
  }
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
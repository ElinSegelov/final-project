/* eslint-disable operator-linebreak */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import EventCalendar from 'components/EventCalendar';
import EventCardContainer from 'components/userDashboard/events/EventCardContainer';
import { CalenderAndCardWrapper, InnerWrapper } from 'styles/Containers';
import { Button1, ButtonReversed } from 'styles/Button.styles';
import Tutorial from './Tutorial';

const LandingPage = () => {
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);
  return (
    <LandingpageInnerWrapper>
      <TutorialSection>
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
      </TutorialSection>
    </LandingpageInnerWrapper>
  )
}

export default LandingPage

const LandingpageInnerWrapper = styled(InnerWrapper)`
  min-height: 100vh;
  position: relative;
  width: fit-content;
`

const TutorialSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  position: relative;
  padding: 0;
  
  @media(min-width: 1024px) {
    min-width: 1000px;
    width: 60%;
    align-items: flex-start;
  }
`

const CalendarAndEvents = styled(CalenderAndCardWrapper)`
@media (min-width: 768px) {
  width: 30rem;
  }
`
const RegisterLoginWrapper = styled.div`
  @media (min-width: 1024px) {
    position: absolute;
    bottom: 0rem;
    right: 0;
    top: calc(14vh + 48rem);
    padding: 
    
  }
`
const LoginButton = styled(ButtonReversed)`
  width: 6rem;
`
const RegisterButton = styled(Button1)`
  width: 6rem;
`

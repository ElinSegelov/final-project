/* eslint-disable operator-linebreak */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import EventCalendar from 'components/EventCalendar';
import EventCardContainer from 'components/userDashboard/events/EventCardContainer';
import { CalenderAndCardWrapper, InnerWrapper } from 'styles/Containers';
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
            <Link className="login" to="/login">Log in</Link>
            <Link className="register" to="/register">Register</Link>
          </RegisterLoginWrapper> : false}
      </TutorialSection>
    </LandingpageInnerWrapper>
  );
};

export default LandingPage;

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
  @media (min-width: 1024px) {
    margin: 0;
  }
`
const RegisterLoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90vw;

  a {
    width: 6rem;
    padding: 0.5rem;
    border-radius: 0.6rem;
    text-align: center;
    margin: 0;
    width: 100%;
    transform: none;
  }

  .login {
    border: #DE605B 1px solid;
    background: var(--dark);
    color: var(--light);
  }

  .register {
    border: none;
    background: var(--orangeRed);
    color: #000;
  }

  @media (min-width: 768px) {
    max-width: 30rem;

  }

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: right;
    width: 50%;
    position: absolute;
    bottom: 0rem;
    right: 0;
    top: calc(14vh + 48rem);

    a {
      width: 14rem;
    }

    .login {
      &:hover {
        background: var(--orangeRed);
        color: #000;
      }
    }

    .register {
      &:hover {
        background: var(--dark);
        color: var(--light);
        border: #DE605B 1px solid;
      }
    }
  }
`
import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import events from 'reducers/events';
import ui from 'reducers/ui';
import user from 'reducers/user';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Register from 'components/SignupLoginForm/Register';
import NotFound from 'components/NotFound';
import AboutUs from 'components/AboutUs';
import LandingPage from 'components/landingPage/LandingPage';
import Header from 'components/Header';
import Dashboard from 'components/userDashboard/Dashboard';
import Login from 'components/SignupLoginForm/Login';
import styled from 'styled-components/macro';
import { Main } from 'styles/Containers';
import HowItWorks from 'components/HowItWorks';
import BackgroundImg from './assets/images/mini-logo-orange.png';

const App = () => {
  const reducer = combineReducers({
    events: events.reducer,
    ui: ui.reducer,
    user: user.reducer
  });

  const store = configureStore({ reducer });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Main>
          <BackgroundImage src={BackgroundImg} alt="" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<Dashboard />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </Provider>
  );
};

export default App;

const BackgroundImage = styled.img`
  position: fixed;
  z-index: -1;
  width: 150%;
  opacity: 0.15;
  top: 5vh;

  @media(min-width: 768px) {
    top: 15%;
    width: 100%
  }
  @media(min-width: 1024px) {
    width: auto;
    height: 95%;
    top: 4rem;
  }
`
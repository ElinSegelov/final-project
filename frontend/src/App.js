import React from 'react'
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import events from 'reducers/events';
import ui from 'reducers/ui';
import user from 'reducers/user';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Register from 'components/SignupLoginForm/Register';
import NotFound from 'components/NotFound';
import LandingPage from 'components/landingPage/LandingPage';
import Header from 'components/Header';
import UserPage from 'components/userDashboard/Dashboard';
import Login from 'components/SignupLoginForm/Login';
// import Footer from 'components/Footer';
import styled from 'styled-components/macro';
import { Main } from 'styles/Containers';
import BackgroundImg from './assets/images/mini-logo-orange.png'

const App = () => {
  const reducer = combineReducers({
    events: events.reducer,
    ui: ui.reducer,
    user: user.reducer
  })
  const store = configureStore({
    reducer
  })
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Main>
          <BackgroundImage src={BackgroundImg} alt="" />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Routes>
        </Main>
        {/* <Footer /> */}
      </BrowserRouter>
    </Provider>
  )
}
export default App;

const BackgroundImage = styled.img`
  position: fixed;
  z-index: -1;
  width: 150vw;
  opacity: 0.15;
  top: 5vh;
  @media(min-width: 768px) {
    width: 53rem;
    top: 3rem;
  }
`
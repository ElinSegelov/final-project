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
import Footer from 'components/Footer';
import { Main } from 'styles/Containers';

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
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="404" />} />
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}
export default App;


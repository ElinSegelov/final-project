import React from 'react'
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import events from 'reducers/events';
import ui from 'reducers/ui';
import users from 'reducers/user';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import Register from 'components/Register';
import Login from 'components/Login';
import NotFound from 'components/NotFound';
import LandingPage from 'components/landingPage/LandingPage';
import Header from 'components/Header';

export const App = () => {
  const reducer = combineReducers({
    events: events.reducer,
    ui: ui.reducer,
    users: users.reducer
  })
  const store = configureStore({
    reducer
  })
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

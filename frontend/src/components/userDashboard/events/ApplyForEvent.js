/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
import { Button1 } from 'styles/Button.styles';
import { API_URL } from 'utils/utils';

const ApplyToEvent = ({ eventId }) => {
  const user = useSelector((store) => store.user.userInfo);
  const sendApplication = () => {
    console.log('clicked to apply')
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: user.accessToken
      },
      body: JSON.stringify({
        userEmail: user.email,
        username: user.username,
        eventId
      })
    }
    fetch(API_URL('applyForSpot'), options)
  }
  return (
    <Button1
      type="button"
      onClick={sendApplication}>
          Apply for a spot
    </Button1>
  )
}
export default ApplyToEvent;
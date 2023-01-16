import React from 'react';
import { useSelector } from 'react-redux';
import { Button1 } from 'styles/Button.styles';
import { API_URL } from 'utils/utils';
import { swalBlurBackground } from 'utils/sweetAlerts';
import styled from 'styled-components/macro';

const ApplyToEvent = ({ eventId, eventHost }) => {
  const user = useSelector((store) => store.user.userInfo);

  const sendApplication = async () => {
    try {
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
      await fetch(API_URL('applyForSpot'), options);
      swalBlurBackground(`Nice! We sent an email to ${eventHost}!`, 1800)
    } catch (error) {
      console.error(error.stack)
      swalBlurBackground(error.message, 1800)
    }
  }
  return (
    <ApplyButton
      type="button"
      onClick={sendApplication}>
      Apply for a spot
    </ApplyButton>
  )
}
export default ApplyToEvent;

const ApplyButton = styled(Button1)`
  margin: 0.5rem auto 0;
  grid-column: 1 / 4;
  width: 100%
`
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { useSelector } from 'react-redux';
import { Button1 } from 'styles/Button.styles';
import { API_URL } from 'utils/utils';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const ApplyToEvent = ({ eventId }) => {
  const user = useSelector((store) => store.user.userInfo);

  const sendApplication = async () => {
    try {
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
      const response = await fetch(API_URL('applyForSpot'), options);
      const data = await response.json();
      console.log(data)
      Swal.fire({
        title: `${data.message}`, // TODO ändra meddelande
        timer: 5000,
        color: '#DE605B',
        timerProgressBar: true,
        showConfirmButton: false
      })
    } catch (error) {
      console.error(error.message)
      Swal.fire({
        title: `${error.message}`,
        timer: 1400,
        color: '#DE605B',
        timerProgressBar: true,
        showConfirmButton: false
      })
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
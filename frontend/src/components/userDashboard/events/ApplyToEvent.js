import React from 'react';
import { useSelector } from 'react-redux';
import { FilledButton } from 'styles/Button.styles';
import { API_URL } from 'utils/urls';
import { swalInformation } from 'utils/sweetAlerts';
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
      };
      await fetch(API_URL('applyForSpot'), options);
      swalInformation('Nice!', `We sent an email to ${eventHost}!`, 'success', 2000);
    } catch (error) {
      console.error(error.stack);
      swalInformation('Oops! Something went wrong.', 'Try again later', 'error', 2000);
    }
  };
  return (
    <ApplyButton
      type="button"
      onClick={sendApplication}>
      Apply for a spot
    </ApplyButton>
  );
};
export default ApplyToEvent;

const ApplyButton = styled(FilledButton)`
  margin: 0.5rem auto 0;
  grid-column: 1 / 4;
  width: 100%;
`
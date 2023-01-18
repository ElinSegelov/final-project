import React from 'react';
import styled from 'styled-components/macro';
import { FormWrapper } from 'styles/Forms';

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <h1>404</h1>
      <p>Page not found</p>
    </NotFoundWrapper>
  )
}

export default NotFound

const NotFoundWrapper = styled(FormWrapper)`
  min-height: calc(100vh - 17vh);
  min-width: 100%;
  h1 {
    color: var(--orangeRed);
    font-size: 150px;
  }
  p {
    font-size: 36px
  }
`
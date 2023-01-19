import React from 'react';
import styled from 'styled-components/macro';
import { FormWrapper } from 'styles/Forms';

const UnderConstruction = () => {
  return (
    <NotFoundWrapper>
      <h1>Under construction</h1>
      <p>Stay tuned!</p>
    </NotFoundWrapper>
  );
};

export default UnderConstruction;

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
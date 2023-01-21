import React from 'react';
import styled from 'styled-components/macro';

const UnderConstruction = () => {
  return (
    <NotFoundWrapper>
      <InfoWrapper>
        <h1>Under construction</h1>
        <p>Stay tuned!</p>
      </InfoWrapper>
    </NotFoundWrapper>
  );
};

export default UnderConstruction;

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--lightDarkOpacity);
  border-radius: 0.6rem;
  min-height: calc((100vh - 12vh) - 2rem);
  min-width: 100%;

  h1 {
    color: var(--orangeRed);
    font-size: 60px;
    width: 90vw;
    text-align: center;
  }
  
  p {
    font-size: 36px;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 90px;
    }
    
    p {
      font-size: 50px;
    }
  }
`
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%
`
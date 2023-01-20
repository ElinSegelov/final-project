import styled from 'styled-components/macro';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  justify-content: top;
  min-height: calc(100vh - 12vh);

  @media (min-width: 1024px) {
    position: relative;
    justify-content: center;
  }
`

export const InnerWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    width: 60%;
    align-items: center;
  }
`

export const CalenderAndCardWrapper = styled.div`
  width: fit-content;
  margin: 1rem auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  @media (min-width: 1024px) {
    min-height: calc(100vh - 15vh);
  }
`

export const StyledEventCardContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 90vw;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    width: 100%;
  }

  @media (min-width: 1024px) {
    align-items: left;
    display: grid;
    grid-template-columns: repeat(2, 14.5rem);
    grid-auto-flow: row;
  }
`
export const FormWrapperContainer = styled.div`
  display: flex;
  align-items: center;
  
  p {
    width: 12rem;
    font-size: 14px; 
    text-align: center;
  }
  
  span {
    text-decoration: underline;
    color: var(--orangeRed);
  }
  
  @media (min-width: 1024px) {
    margin: auto 0;
  }
`
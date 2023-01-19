import styled from 'styled-components/macro';

export const FilledButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.6rem;
  border: none;
  margin: 0.5rem;
  background: var(--orangeRed);
  color: #000;
  
  @media(min-width: 1024px) { 
    &:hover {
      background: var(--dark);
      color: var(--light);
      border: #DE605B 1px solid;
    }
  }
`

export const ButtonReversed = styled.button`
  padding: 0.5rem;
  border-radius: 0.6rem;
  border: #DE605B 1px solid;
  background: var(--dark);
  color: var(--light);
  width: 100%;
  max-width: 30rem;

  @media(min-width: 1024px) {
    &:hover {
      background: var(--orangeRed);
      color: #000;
    }
  }
`

export const TransparentButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  grid-column: 3;
  background: transparent;
  border: none;
  color: var(--light);
  font-size: 1.5rem;
  
  @media(min-width: 1024px) { 
    &:hover {
      transform: scale(1.2)
    }
  }
`

export const GoBackFromCreateOrEditButton = styled(TransparentButton)`
  position: absolute;
  left: 1rem;
  top: 1rem;
`
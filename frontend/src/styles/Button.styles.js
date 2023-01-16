import styled from 'styled-components/macro';

export const Button1 = styled.button`
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  margin: 0.5rem;
  background: var(--orangeRed);
`
export const ButtonReversed = styled.button`
  padding: 0.5rem;
  border-radius: 1rem;
  border: #DE605B 1px solid;
  margin: 0.5rem;
  background: transparent;
  color: var(--light);
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
`
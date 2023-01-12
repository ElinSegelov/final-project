import styled from 'styled-components/macro';

export const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 90vw;
  min-height: 70vh;
  align-items: center;
  background-color: var(--lightDarkOpacity);
  border-radius: 10px;
  justify-content: center;
  row-gap: 1rem;
  margin-top: 0;
`

export const Form = styled.form`
  gap: 0.5rem;
  display: flex;
  flex-direction: column;
  width: 12rem;
`
export const Input = styled.input`
  width: 100%;
  height: 2.5rem;

`

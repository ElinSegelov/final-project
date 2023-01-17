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
  
  @media (min-width: 1024px) {
    width: 100%;
    max-width: 100vw;
  }
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

export const Select = styled.select`
  //width: 12rem;
  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;
`

export const Label = styled.label`
  visibility: hidden;
  font-size: 1px;
  height: fit-content;
  position: absolute;
`
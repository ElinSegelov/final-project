import styled from 'styled-components/macro';

export const FormWrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 90vw;
  min-height: 70vh;
  align-items: center;
  background-color: var(--lightDarkOpacity);
  border-radius: 0.6rem;
  justify-content: center;
  row-gap: 1rem;
  margin-top: 1rem;
  position: relative;
  padding: 2rem 0;

  @media (min-width: 768px) {
    min-width: 25rem;
    padding: 2rem;
    margin-top: 0;
  }

  @media (min-width: 1024px) {
    width: 80%;
    min-height: 60vh;
    max-width: 27rem;
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
  width: 100%;
  height: 2.5rem;
  margin-top: 0.5rem;
`

export const ScreenReaderLabel = styled.label`
  visibility: hidden;
  font-size: 1px;
  height: fit-content;
  position: absolute;
`

export const SpotsInformation = styled.div`
  text-align: center;
  
  legend {
    width: 12rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;
  }

  p {
    margin-top: 0.5rem;
  }

  input {
    width: 5rem;
    margin-top: 0.5rem;
  }
`
export const TextArea = styled.textarea`
  width: 12rem;
`
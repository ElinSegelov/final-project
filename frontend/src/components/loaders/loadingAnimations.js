/* eslint-disable no-unused-vars */
import React from 'react'
import { swalBlurBackground } from 'utils/sweetAlerts'
import loaderOrange from 'assets/Loader/Loader_2.gif'
import { FormWrapper } from 'styles/Forms'
import { InnerWrapper } from 'styles/Containers'
import styled from 'styled-components'

export const LoadingForGameFetch = () => {
  return swalBlurBackground()
}
export const LoadingBlurBackground = () => {
  return (
    <LoaderWrapper>
      <GifLoader src={loaderOrange} alt="loader" />
    </LoaderWrapper>
  )
}
export const LoadingForGameSearch = () => {
  return (
    <GifLoader src={loaderOrange} alt="loader" />
  )
}

const GifLoader = styled.img`
  display: flex;
  width: 100%;
  height: auto;
  align-items:center;
  justify-content: center; 
  `
const LoaderWrapper = styled(FormWrapper)`
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: #24293121;
`


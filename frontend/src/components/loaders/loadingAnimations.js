import React from 'react';
import loaderOrange from 'assets/Loader/Loader_2.gif';
import styled from 'styled-components/macro';

export const LoadingBlurBackground = () => {
  return (
    <LoaderWrapper>
      <GifLoader src={loaderOrange} alt="loader" />
    </LoaderWrapper>
  );
};

export const LoadingForGameSearch = () => {
  return (
    <GifLoader src={loaderOrange} alt="loader" />
  );
};

const GifLoader = styled.img`
  width: 100%;
  height: auto;
`
const LoaderWrapper = styled.div`
  display: flex;
  align-items:center;
  justify-content: center; 
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: var(--darkOpacity);
  width: 100%;
  height: calc(100vh - 12vh - 2rem);
  position: relative;
  bottom: 2rem;
`


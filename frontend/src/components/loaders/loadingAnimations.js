import React from 'react';
import loaderOrange from 'assets/Loader/Loader_2.gif';
import styled from 'styled-components/macro';

export const LoadingBlurBackground = () => {
  return (
    <LoaderWrapper>
      <GifLoader src={loaderOrange} alt="loader" />
      <h2>Loading...</h2>
    </LoaderWrapper>
  );
};

export const LoadingForGameSearch = () => {
  return (
    <GifLoaderForGameSearch src={loaderOrange} alt="loader" />
  );
};

const GifLoader = styled.img`
  width: 20rem;
  height: 20rem;
`
const GifLoaderForGameSearch = styled.img`
  width: 100%;
  height: auto;
`
const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center; 
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: var(--darkOpacity);
  width: 100vw;
  height: calc(100vh - 17vh);
  position: relative;
  bottom: 1rem;
`


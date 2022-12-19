import React from 'react'
import styled from 'styled-components'
import twistedArrowRightBottom from '../../assets/icons/twisted-arrow-right-to-bottom-icon.svg'

const Tutorial = () => {
  return (
    <LandingInfoSection>
      <h1>Ever found yourself missing a few players for boardgame night?</h1>
      <ArrowRightBottom src={twistedArrowRightBottom} alt="Arrow to next text block" />
      <p>This will be an explenation
        This will be an explenation
        This will be an explenation
        This will be an explenation
      </p>
      <ArrowLeftBottom src={twistedArrowRightBottom} alt="Arrow to next text block" />
    </LandingInfoSection>
  )
}

export default Tutorial

const ArrowRightBottom = styled.img`
  width: 20%;
  height: 20%;
  transform: rotate(50deg);
`
const ArrowLeftBottom = styled.img`
  width: 20%;
  height: 20%;
  transform: scaleX(-1);
  transform: rotate(0deg);
`
const LandingInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10vh;
  align-items: center;
  justify-content: center;
`


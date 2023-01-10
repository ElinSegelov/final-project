/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import styled from 'styled-components/macro'
import lightDice from '../../assets/images/mini-logo-light-grey.png'
import rollingDice from '../../assets/Loader/loader-orange-small.gif'

const Tutorial = () => {
  return (
    <LandingInfoSection>
      <h2>Missing players for boardgame night? -No problem!</h2>
      <TutorialContainer>
        {/*       <ArrowContainer> */}
        <HorizontalLine1> </HorizontalLine1>
        <DiceBullet1 src={lightDice} alt="Bulletpoint" />
        <HorizontalLine2> </HorizontalLine2>
        <DiceBullet2 src={lightDice} alt="Bulletpoint" />
        <HorizontalLine3> </HorizontalLine3>
        <DiceBullet3 src={lightDice} alt="Bulletpoint" />
        <HorizontalLine4> </HorizontalLine4>
        <RollingDice src={rollingDice} alt="Bulletpoint" />
        <HorizontalLine5> </HorizontalLine5>
        {/* </ArrowContainer> */}
        <P1>Choose your game</P1>
        <P2>Create an event</P2>
        <P3>Get members for your party</P3>
        <P4>Roll dice!</P4>
      </TutorialContainer>

    </LandingInfoSection>
  )
}

export default Tutorial

const LandingInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const P1 = styled.p`
  grid-row: 2;
  grid-column: 2;
`
const P2 = styled.p`
  grid-row: 4;
  grid-column: 2;
`
const P3 = styled.p`
  grid-row: 6;
  grid-column: 2;
`
const P4 = styled.p`
  grid-row: 8;
  grid-column: 2;
`
const HorizontalLine = styled.div`
  border: 1px solid var(--light);
  width: 2px;
  height: 2rem;
  grid-column: 1;
  margin: 0.25rem auto;
`
const HorizontalLine1 = styled(HorizontalLine)`
  grid-row: 1;
`
const HorizontalLine2 = styled(HorizontalLine)`
  grid-row: 3;
`
const HorizontalLine3 = styled(HorizontalLine)`
  grid-row: 5;
`
const HorizontalLine4 = styled(HorizontalLine)`
  grid-row: 7;
`
const HorizontalLine5 = styled(HorizontalLine)`
  grid-row: 9;
`
const DiceBullet = styled.img`
  width: 2rem;
`

const DiceBullet1 = styled(DiceBullet)`
  grid-row: 2;
`
const DiceBullet2 = styled(DiceBullet)`
  grid-row: 4;
`
const DiceBullet3 = styled(DiceBullet)`
  grid-row: 6;
`

const TutorialContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 80%;
  
`
const ArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const RollingDice = styled.img`
  width: 2rem;
  grid-row: 8;
`
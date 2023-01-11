
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/self-closing-comp */
import React from 'react'
import styled from 'styled-components/macro'
import lightDice from '../../assets/images/mini-logo-light-grey.png'
import orangeDice from '../../assets/images/mini-logo-orange.png'
import rollingDice from '../../assets/Loader/loader-orange-small.gif'

const Tutorial = () => {
  return (
    <LandingInfoSection>
      <BackgroundImage src={orangeDice} alt="" />
      <HeadingWrapper>
        <h2>Looking for players?</h2>
        <h3>No problem!</h3>
      </HeadingWrapper>
      <TutorialContainer>
        <HorizontalLine1> </HorizontalLine1>
        <DiceBullet1 src={lightDice} alt="Bulletpoint" />
        <HorizontalLine2> </HorizontalLine2>
        <DiceBullet2 src={lightDice} alt="Bulletpoint" />
        <HorizontalLine3> </HorizontalLine3>
        <DiceBullet3 src={lightDice} alt="Bulletpoint" />
        <HorizontalLine4> </HorizontalLine4>
        <RollingDice src={rollingDice} alt="Bulletpoint" />
        <HorizontalLine5> </HorizontalLine5>
        <P1>Choose your game</P1>
        <P2>Create an event</P2>
        <P3>Find party members</P3>
        <P4>Roll dice!</P4>
      </TutorialContainer>
    </LandingInfoSection>
  )
}
export default Tutorial;

const BackgroundImage = styled.img`
  position: fixed;
  z-index: -1;
  width: 150vw;
  opacity: 0.15;
  top: 6vh;
`
const LandingInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 0;
`
const HeadingWrapper = styled.div`
  line-height: 1.5;
  font-size: 1.5rem;
  margin: 2vh 0;
`

const TutorialContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 80%;
  align-items: center;
  column-gap: 1rem;
  width: 90%;
`
const P = styled.p`
  grid-column: 2;
  font-size: 1.25rem;
`
const P1 = styled(P)`
  grid-row: 2;
`
const P2 = styled(P)`
  grid-row: 4;
`
const P3 = styled(P)`
  grid-row: 6;
`
const P4 = styled(P)`
  grid-row: 8;
`
const HorizontalLine = styled.div`
  border: 1px solid var(--light);
  width: 2px;
  height: 2rem;
  grid-column: 1;
  margin: 0.5rem auto;
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
const RollingDice = styled.img`
  width: 2rem;
  grid-row: 8;
`

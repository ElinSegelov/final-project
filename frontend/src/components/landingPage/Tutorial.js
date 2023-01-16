/* eslint-disable react/self-closing-comp */
import React from 'react';
import styled from 'styled-components/macro';
import lightDice from '../../assets/images/mini-logo-light-grey.png';
import rollingDice from '../../assets/Loader/loader-light-small.gif';

const Tutorial = () => {
  return (
    <TutorialSection>
      <HeadingWrapper>
        <h2>Looking</h2> <h2>for players<span>?</span></h2>
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
        <PWrapper1><h3>Choose</h3><p>game</p></PWrapper1>
        <PWrapper2><h3>Create</h3><p>event</p></PWrapper2>
        <PWrapper3><h3>Find</h3><p>players</p></PWrapper3>
        <PWrapper4><h3>Roll</h3><p>dice!</p></PWrapper4>
      </TutorialContainer>
    </TutorialSection>
  )
}
export default Tutorial;

const TutorialSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  position: relative;
  padding: 0;
  
  @media(min-width: 1024px) {
    min-width: 1000px;
    width: 60%;
    align-items: flex-start;
  }
`
const HeadingWrapper = styled.div`
  line-height: 1.5;
  font-size: 1.5rem;
  margin: 4vh 0;
  width: 50%;
  position: relative;

  span {
    color: var(--orangeRed);
    font-size: 7rem;
    position: absolute;
    top: -1rem;
  }

  @media(min-width: 768px) {
    h2 {
      font-size: 4rem;
      margin: 0;
    }
    h3 {
      font-size: 3rem;
    }
  }
  @media(min-width: 1024px) {
    min-width: 1000px;
    width: 60%;
    justify-content: left;
    align-items: flex-end;

    span {
      top: 3rem;
    }
  }
`
const TutorialContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 80%;
  align-items: center;
  column-gap: 1rem;
  width: 90%;
  
  @media(min-width: 1024px) {
    grid-template-columns: calc(100% - 3rem) 3rem;
    justify-content: right;
    text-align: right;
    row-gap: 1rem;
    width: 100%;
    position: absolute;
    top: 13vh;
  }
`

const PWrapper = styled.div`
  grid-column: 2;
  font-size: 1.25rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;

  h3 {
    color: var(--orangeRed);
  }

  p {
   padding-top: 0.16rem;
  }
  @media(min-width: 1024px) {
    grid-column: 1;
    display: block;
    line-height: 0.9;
  
    h3 {
    font-size: 50px;
    font-weight: bold;
  }
  p {
    font-size: 24px;
  }
}
  
`
const PWrapper1 = styled(PWrapper)`
  grid-row: 2;
`
const PWrapper2 = styled(PWrapper)`
  grid-row: 4;
`
const PWrapper3 = styled(PWrapper)`
  grid-row: 6;
`
const PWrapper4 = styled(PWrapper)`
  grid-row: 8;

  @media(min-width: 1024px) {
    p{
      color: var(--organgeRed)
    }
  }
`
const HorizontalLine = styled.div`
  border: 1px solid var(--light);
  width: 2px;
  height: 2rem;
  grid-column: 1;
  margin: 0.5rem auto;

  @media(min-width: 1024px) {
    grid-column: 2;
    height: 3rem;
  }
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

  @media(min-width: 1024px) {
    grid-column: 2;
    width: 3rem;
  }
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

  @media(min-width: 1024px) {
    grid-column: 2;
    width: 3rem;
  }
`

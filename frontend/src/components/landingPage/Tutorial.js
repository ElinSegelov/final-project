/* eslint-disable react/self-closing-comp */
import React from 'react';
import styled from 'styled-components/macro';
import lightDice from '../../assets/images/mini-logo-light-grey.png';

const Tutorial = () => {
  return (
    <>
      <HeadingWrapper>
        <h2>Looking for</h2><h2>players<span>?</span></h2>
      </HeadingWrapper>
      <TutorialContainer>
        <HorizontalLine1> </HorizontalLine1>
        <DiceBullet1 src={lightDice} alt="bulletpoint dice" />
        <HorizontalLine2> </HorizontalLine2>
        <DiceBullet2 src={lightDice} alt="bulletpoint dice" />
        <HorizontalLine3> </HorizontalLine3>
        <DiceBullet3 src={lightDice} alt="bulletpoint dice" />
        <HorizontalLine4> </HorizontalLine4>
        <DiceBullet4 src={lightDice} alt="bulletpoint dice" />
        <HorizontalLine5> </HorizontalLine5>
        <PWrapper1><h3>Choose</h3><p>game</p></PWrapper1>
        <PWrapper2><h3>Create</h3><p>event</p></PWrapper2>
        <PWrapper3><h3>Find</h3><p>players</p></PWrapper3>
        <PWrapper4><h3>Roll</h3><p>dice!</p></PWrapper4>
      </TutorialContainer>
    </>
  );
};

export default Tutorial;

const HeadingWrapper = styled.div`
  line-height: 1.5;
  font-size: 1.5rem;
  margin: 4vh 0;
  position: relative;

  span {
    color: var(--orangeRed);
    font-size: 6rem;
    position: absolute;
    top: 0.5rem;
    left: 32vw;
  }

  @media(min-width: 768px) {
    span {
      font-size: 7rem;
      top: 4.5vh;
      left: 30vw;
    }
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
      font-size: 7rem;
      left: 15rem;
    }
  }
`
export const TutorialContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 80%;
  align-items: center;
  column-gap: 1rem;
  width: 90%;
  margin-bottom: 2rem;

  @media(min-width: 768px) {
   width: 30rem
  }
  
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
export const PWrapper = styled.div`
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
export const PWrapper1 = styled(PWrapper)`
  grid-row: 2;
`
export const PWrapper2 = styled(PWrapper)`
  grid-row: 4;
`
export const PWrapper3 = styled(PWrapper)`
  grid-row: 6;
`
export const PWrapper4 = styled(PWrapper)`
  grid-row: 8;

  @media(min-width: 1024px) {
    p{
      color: var(--organgeRed)
    }
  }
`
export const HorizontalLine = styled.div`
  visibility: hidden;
  height: 2rem;
  grid-column: 1;

  @media(min-width: 1024px) {
    border: 1px solid var(--light);
    width: 2px;
    margin: 0.5rem auto;
    grid-column: 2;
    height: 3rem;
    visibility: visible;
  }
`
export const HorizontalLine1 = styled(HorizontalLine)`
  grid-row: 1;
`
export const HorizontalLine2 = styled(HorizontalLine)`
  grid-row: 3;
`
export const HorizontalLine3 = styled(HorizontalLine)`
  grid-row: 5;
`
export const HorizontalLine4 = styled(HorizontalLine)`
  grid-row: 7;
`
export const HorizontalLine5 = styled(HorizontalLine)`
  grid-row: 9;
`
export const DiceBullet = styled.img`
  width: 2rem;

  @media(min-width: 1024px) {
    grid-column: 2;
    width: 3rem;
  }
`
export const DiceBullet1 = styled(DiceBullet)`
  grid-row: 2;
`
export const DiceBullet2 = styled(DiceBullet)`
  grid-row: 4;
`
export const DiceBullet3 = styled(DiceBullet)`
  grid-row: 6;
`
export const DiceBullet4 = styled(DiceBullet)`
  grid-row: 8;
`
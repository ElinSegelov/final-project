import React from 'react'
import { FlexDiv, InformationContainer } from 'styles/Containers';
import styled from 'styled-components/macro';
import { DiceBullet } from './landingPage/Tutorial';
import lightDice from '../assets/images/mini-logo-orange.png';

const HowItWorks = () => {
  return (
    <HowItWorksContainer>
      <h1>How it works</h1>
      <ContentWrapper>
        <div>
          <p>Using Octahedron is a great way to connect with other board game enthusiasts and
          enjoy your favorite games with new people. Octahedron takes the hassle out of organizing
          board game events. So why wait? Create an event today and start rolling the dice with new
          friends!
          </p>
        </div>

        <div>
          <FlexDiv>
            <BulletpointDice src={lightDice} alt="bulletpoint" />
            <h2>Create</h2>
          </FlexDiv>
          <p>Choose a game you want to play and create an event on Octahedron’s website,
            specifying details about the game session.
          </p>
          <p>When created, your event will be displayed on Octahedron’s calendar for other
            players to see.
          </p>
        </div>

        <div>
          <FlexDiv>
            <BulletpointDice src={lightDice} alt="bulletpoint" />
            <h2>Find</h2>
          </FlexDiv>
          <p>Other players interested in your event can apply for a spot.
          When someone applies, you will receive an email with their contact information.
          </p>
          <p>You can then contact the player via email to make arrangements for the game session.
          </p>
        </div>

        <div>
          <FlexDiv>
            <BulletpointDice src={lightDice} alt="bulletpoint" />
            <h2>Roll dice</h2>
          </FlexDiv>
          <p>Meet up with your group of players at the specified time and location.</p>
          <p>Roll the dice and have a good time playing your chosen game!</p>
        </div>
      </ContentWrapper>
    </HowItWorksContainer>
  )
}

export default HowItWorks;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 1024px) { 
    max-width: 60rem;
    margin-top: 1rem;
  }
`
const HowItWorksContainer = styled(InformationContainer)`
position: relative; 
  @media (min-width: 768px) { 
    padding: 8rem;
    justify-content: center;
  }
  @media (min-width: 1024px) { 
    align-items: center;
  }
`

const BulletpointDice = styled(DiceBullet)`
  margin-right: 1rem;
`


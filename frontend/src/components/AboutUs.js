import React from 'react';
import styled from 'styled-components/macro';
import { IoLogoLinkedin } from 'react-icons/io5'
import { BsBriefcaseFill } from 'react-icons/bs'

//! Ersätta det mot fetch till /aboutusinfo
const AboutUs = () => {
  const info = [
    {
      name: 'Elin Segelöv',
      linkedIn: 'https://www.linkedin.com/in/elin-s-683a867a/',
      web: 'https://elinsegelov.netlify.app',
      email: 'elin.segelov@gmail.com',
      portrait: 'https://elinsegelov.netlify.app/static/media/portrait.6c39ec6df5103d58d5d2.webp'
    },
    {
      name: 'David Ballester',
      linkedIn: 'https://www.linkedin.com/in/davidballesterfont/',
      web: 'https://davidballester.dev/',
      email: 'dballesterfont@gmail.com',
      portrait: 'https://davidballester.dev/static/media/profile-pic.a4381bec9c8e9fe25a84.webp'

    }
  ]

  const contactCards = info.map((person) => {
    return (
      <ProfileCard>
        <ImageAndUserInfoWapper>
          <Img src={person.portrait} alt={person.name} />
          <UserInfoWapper>
            <Name>{person.name}</Name>
            <a href={person.linkedIn}><Links><IoLogoLinkedin />LinkedIn Profile</Links></a>
            <a href={person.web}><Links><BsBriefcaseFill /> Portfolio</Links></a>
          </UserInfoWapper>
        </ImageAndUserInfoWapper>
      </ProfileCard>
    )
  })
  return (
    <AboutUsContainer>
      <h1>About us</h1>
      <ContentWrapper>
        <TextWrapper>
          <p>
            Octahedron is the result of a final project in a frontend
            developer boot camp at Technigo.
          </p>
          <p>
            The idea about Octahedron came to us when we were talking about only having one
            or two friends who enjoy playing bord games like we do. So we decided to
            make a site where people can find more players for their bord game sessions.
            We had plenty of big ideas and from them we have created Octahedron.
          </p>
          <p>
            The scope for the final project was three weeks of part time work so we didn’t
            have enought time to add all the features we wanted. As we enjoy the concept too
            much to leave it here, we will continue working on it as a side project,
            fixing bugs and adding features along the way.
          </p>
        </TextWrapper>
        <CardContainer>
          <CardWrapper>
            {contactCards}
          </CardWrapper>
        </CardContainer>
      </ContentWrapper>
    </AboutUsContainer>
  );
}

export default AboutUs;

const AboutUsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--lightDarkOpacity);
  border-radius: 0.6rem;
  min-height: calc(100vh - 17vh);
  width: 90vw;
  padding: 1rem;
  
  h1 {
    color: var(--orangeRed);
    font-size: 2.5rem;
    text-align: center;
    font-family: 'Gotham-book';
    line-height: 0.9;
  }
  @media (min-width: 768px) { 
    padding: 10rem;
    justify-content: center;
  }
  @media (min-width: 1024px) { 
    align-items: center;
  }
`
const ContentWrapper = styled.div`
  @media (min-width: 1024px) { 
    display: flex;
    gap: 2rem;
    max-width: 60rem;
    margin-top: 1rem;
  }
`
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 1024px) { 
    margin: 0;
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 1024px) { 
    height: 100%;
    justify-content: center;
    gap: 2rem;
  }
`
const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--dark);
  border: 1px solid var(--orangeRed);
  width: calc(90vw - 2rem);
  padding: 0.5rem;
  border-radius: 0.6rem;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) { 
   width: calc(90vw - 20rem);
  }

  @media (min-width: 1024px) { 
    width: calc((90vw - 20rem) / 2);
    max-width: 28rem;
  }
`
const Img = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  filter: grayscale(100%);
`

const ImageAndUserInfoWapper = styled.div`
  display: flex;
  gap: 1rem;
`
const UserInfoWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
   
   a {
    text-decoration: underline;
   }
`
const Name = styled.p`
  color: var(--orangeRed);
  font-size: 20px;
`
const Links = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
`

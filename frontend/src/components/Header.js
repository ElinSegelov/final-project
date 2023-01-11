/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
// import { AiOutlineCloseCircle } from 'react-icons/ai'
import { SlMenu } from 'react-icons/sl'
import { FaUser } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import logo from '../assets/images/logo.png';

const Header = () => {
  const [navMenuActive, setNavMenuActive] = useState(false);

  const showNavLinks = () => {
    if (navMenuActive === false) {
      setNavMenuActive(true);
    } else {
      setNavMenuActive(false);
    }
  }
  return (
    <StyledHeader>
      <FlexDiv>
        <Link to="/"><Logo src={logo} alt="Octahedron" /></Link>
        <FlexDivUserAndHamburgare>
          <Link to="/login"><FaUser fontSize={27} color="var(--light)" /></Link>
          {!navMenuActive
            ? <Hamburger onClick={showNavLinks}>
              <SlMenu fontSize={30} />
            </Hamburger>
            : <Hamburger onClick={showNavLinks}>
              <IoClose fontSize={45} />
            </Hamburger>}
        </FlexDivUserAndHamburgare>
      </FlexDiv>
      <NavLinkWrapper style={navMenuActive ? { display: 'flex' } : { display: 'none' }}>
        <NavLinks>
          <NavLink to="/" end><NavText>Home</NavText></NavLink>
          <NavLink to="/aboutUs"><NavText>About us</NavText></NavLink>
          <NavLink to="/howItWorks"><NavText>How it works</NavText></NavLink>
          <NavLink to="/events"><NavText>Events</NavText></NavLink>
        </NavLinks>
      </NavLinkWrapper>
    </StyledHeader>
  )
}

export default Header;

const StyledHeader = styled.header`
  width: 100vw;
  height: 12vh;
  max-width: 100vw;
  border-bottom: 1px solid var(--orangeRed);
  //background-image: url('../assets/images/hero1.png')
`
const Logo = styled.img`
  width: 13rem;
`

const FlexDiv = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  height: 12vh;
  align-items: center;
`
const FlexDivUserAndHamburgare = styled.div`
  display: flex;
  flex-direction: row;
  width: 5rem;
  justify-content: space-between;
  height: 12vh;
  padding: 1rem 0 ;
  align-items: center;
`
const NavLinkWrapper = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  backdrop-filter: blur(8px);
  z-index: 1;
  
  @media (min-width: 600px) {
    position: static;
    height: 6rem;
    background-color: var(--bg-nav);
    backdrop-filter: none;
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: auto;
    
  }
`
const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 8rem;
  list-style: none;
  padding-left: 1rem;

  @media (min-width: 600px) {
    flex-direction: row;
    position: static;
    margin: 0;
    justify-content: space-around;
    gap: 1rem;
    padding: 0 1rem;
  }
`

const NavText = styled.li`
  font-size: 20px;
  font-family: 'Barlow Condensed', sans-serif;
  letter-spacing: 2.7px;
  text-transform: uppercase;
  color: var(--light);
  margin: 1rem;
  
  @media (min-width: 600px) {
    margin: 0;
    font-size: 16px;    
  }
  span {
    @media (min-width: 600px) {
      display: none;
    }
  }
`

const Hamburger = styled.div`
  z-index: 2;

  @media (min-width: 600px) {
    display: none;
  }
  
  img {
    width: 1.5rem;
  }
`

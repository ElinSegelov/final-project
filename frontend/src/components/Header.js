/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { BsDice4 } from 'react-icons/fa'
import { GiDiceEightFacesEight } from 'react-icons/gi';
import hamburger from '../assets/icons/icon-hamburger.svg';
import close from '../assets/icons/icon-close.svg';
import profileIcon from '../assets/icons/profile-icon.svg'

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

      <Link to="/"><GiDiceEightFacesEight className="placeholder" /></Link>
      <h1>Octahedron</h1>
      </FlexDiv>
      <Link to="/login"><ProfileIcon src={profileIcon} alt="Login" /></Link>
      {!navMenuActive
        ? <Hamburger onClick={showNavLinks}>
          <img src={hamburger} alt="Open navmenu" />
        </Hamburger>
        : <Hamburger onClick={showNavLinks}>
          <img src={close} alt="Close navmenu" />
        </Hamburger>}
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
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  height: 10vh;
  max-width: 100vw;

  //! placeholder tillsammans med h1 är bara tillfälligt. Ska ersättas av logga.
  .placeholder {
    width: 3rem !important;
    height: 3rem !important;
    fill: var(--orangeRed) !important;
  }

  h1 {
    margin-left: 0.5rem;
  }
`

const FlexDiv = styled.div`
  display: flex;
`

const ProfileIcon = styled.img`
  width: 2rem;
  position: relative;
  right: 3rem;
  
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
  color: var(--secondary-text);
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
  position: absolute;
  right: 1rem;

  @media (min-width: 600px) {
    display: none;
  }
  
  img {
    width: 1.5rem;
  }
`

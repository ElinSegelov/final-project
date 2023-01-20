/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { SlMenu } from 'react-icons/sl';
import { FaUser } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import logo from '../assets/images/logo.png';

const Header = () => {
  const [navMenuActive, setNavMenuActive] = useState(false);
  const accessToken = useSelector((store) => store.user.userInfo.accessToken);

  const showNavLinks = () => {
    if (navMenuActive === false) {
      setNavMenuActive(true);
    } else {
      setNavMenuActive(false);
    }
  };
  return (
    <StyledHeader>
      <FlexDiv>
        <Link className="logo" to="/"><Logo src={logo} alt="Octahedron" /></Link>
        <NavLinkWrapper style={navMenuActive ? { display: 'flex' } : { display: 'none' }}>
          <NavLinks>
            <NavLink to="/" end><NavText>Home</NavText></NavLink>
            <NavLink to="/underConstruction"><NavText>How it works</NavText></NavLink>
            <NavLink to="/underConstruction"><NavText>About us</NavText></NavLink>
            <NavLink to="/login"><NavText>Profile</NavText></NavLink>
            {!accessToken ? <NavLink to="/login"><NavText>Log in</NavText></NavLink> : null}
          </NavLinks>
        </NavLinkWrapper>
        <FlexDivUserAndHamburger>
          <Link to="/login"><FaUser fontSize={27} color="var(--light)" /></Link>
          {!navMenuActive
            ? <Hamburger onClick={showNavLinks}>
              <SlMenu fontSize={30} />
            </Hamburger>
            : <Hamburger onClick={showNavLinks}>
              <IoClose fontSize={45} />
            </Hamburger>}
        </FlexDivUserAndHamburger>
      </FlexDiv>
    </StyledHeader>
  )
}

export default Header;

const StyledHeader = styled.header`
  height: 12vh;
  min-height: 4rem;
  max-width: 100%;
  border-bottom: 1px solid var(--orangeRed);
  background: var(--dark);
`
const Logo = styled.img`
  width: 13rem;
  @media (min-width: 1024px) {
    width: 20rem;
  }
`
const FlexDiv = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  height: 12vh;
  align-items: center;
  margin: 0 auto;

  .logo {
    transform: none;
  }
`
const FlexDivUserAndHamburger = styled.div`
  display: flex;
  flex-direction: row;
  width: 5rem;
  justify-content: space-between;
  height: 12vh;
  padding: 1rem 0 ;
  align-items: center;
  
  @media (min-width: 1024px) {
    justify-content: right;
    display: none;
  }

`
const NavLinkWrapper = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 200%;
  backdrop-filter: blur(13px);
  background: var(--darkOpacity);
  z-index: 3;
  
  @media (min-width: 1024px) {
    position: static;
    height: 6rem;
    width: 100%;
    background-color: var(--bg-nav);
    backdrop-filter: none;
    display: flex !important;
    align-items: center;
    justify-content: right;
  }
`
const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 8rem;
  right: 1.5rem;
  list-style: none;
  padding-left: 1rem;
  text-align: right;
  gap: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    position: static;
    margin: 0;
    justify-content: space-around;
    gap: 2rem;
    padding: 0 1rem;
  }
`
const NavText = styled.li`
  font-size: 1.6rem;
  font-family: 'Gotham-Book', sans-serif;
  letter-spacing: 2.7px;
  color: var(--light);
  
  @media (min-width: 1024px) {
    margin: 0;
    font-size: 16px;    
  }
`
const Hamburger = styled.div`
  z-index: 4;
  
  img {
    width: 1.5rem;
  }
`

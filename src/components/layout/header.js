import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as HomeLogo } from '../../assets/home.svg'
import { ReactComponent as Toggler } from '../../assets/toggler.svg'
import { bool, func } from 'prop-types'

const HeaderWrapper = styled.section`
  //padding:  2em;
`

const StyledHeader = styled.header`
  //display: flex;
  //background: #3cb371;
  // background: mediumseagreen;
  //height: ${({ menuisopen }) => (menuisopen ? '1em' : '3em')};
  //height: 3em;
  //border-radius: 7px;
  // @media (max-width: 600px) {
  //   //height: ${({ menuisopen }) => (menuisopen ? 'auto' : '3em')};
  // }
`

const StyledNavBar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  padding: 1em 1em;
  transform-origin: 1px;
  background: #3cb371;
  border-radius: 7px;
  height: ${({ menuisopen }) => (menuisopen ? 'auto' : '3em')};
  //background: ${({ menuisopen }) => (menuisopen ? '#3cb371' : 'blue')};
  @media (max-width: 600px) {
    //height: ${({ menuisopen }) => (menuisopen ? '#3cb371' : 'blue')};
    flex-direction: column;
    //flex: 1 auto;
    // background: #3cb371;
    flex-flow: column;
    //height: auto;
  }
`

const NavBarRegion = styled.div`
  height: '50px';
`

const LeftNavBarRegion = styled(NavBarRegion)`
  flex-grow: 0.2;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 600px) {
    padding: 0 1em;
    justify-content: flex-start;
  }
`

const CenterNavBarRegion = styled(NavBarRegion)`
  flex-grow: 6;
  display: flex;
  @media (max-width: 600px) {
    //flex-grow: 1;
    flex-direction: column;

    justify-content: space-around;
    transform: ${({ menuisopen }) =>
      menuisopen ? 'translateX(0)' : 'translateX(-100%)'};
    //transform: translateX(-100%);
  }
`

const RightNavBarRegion = styled(NavBarRegion)`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 600px) {
    justify-content: flex-start;
    transform: translateX(-100%);
    display: none;
  }
`

const NavBarInfo = styled.div`
  color: ${props => (props.primary ? 'white' : 'beige')};
  padding: 0 1em;
  &: hover {
    color: black;
  }
`

const StyledHomeLogo = styled(HomeLogo)`
  height: 1em;
  fill: white;

  &: hover {
    fill: black;
  }
  @media (max-width: 600px) {
    display: none;
  }
`
const StyledToggler = styled(Toggler)`
  height: 24px;
  fill: white;
  display: none;
  padding-bottom: 0.15em;

  &: hover {
    fill: black;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 600px) {
    display: flex;
  }
`

const activeClassName = 'active'

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  color: white;
  padding: 0 1em;
  textdecoration: none;
  &: hover {
    color: black;
    text-decoration: none;
  }
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
  // &: active {
  //   text-decoration: underline;
  // }
  &.${activeClassName} {
    color: #713cb3;
  }
  @media (max-width: 600px) {
    padding: 0.15em 1em;
  }
`

const Header = ({ menuIsOpen, setMenuIsOpen }) => {
  return (
    <>
      <HeaderWrapper>
        <StyledHeader>
          <StyledNavBar menuisopen={menuIsOpen}>
            <LeftNavBarRegion>
              <StyledToggler
                menuisopen={menuIsOpen.toString()}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              />
              <StyledHomeLogo />
            </LeftNavBarRegion>
            <CenterNavBarRegion menuisopen={menuIsOpen}>
              <StyledNavLink exact to="/home" activeClassName="selected">
                Home
              </StyledNavLink>
              <StyledNavLink to="/tools" activeClassName="selected">
                Tools
              </StyledNavLink>
              <StyledNavLink to="/about" activeClassName="selected">
                About
              </StyledNavLink>
            </CenterNavBarRegion>
            <RightNavBarRegion>
              <NavBarInfo>Not logged in</NavBarInfo>
            </RightNavBarRegion>
          </StyledNavBar>
        </StyledHeader>
      </HeaderWrapper>
    </>
  )
}

Header.propTypes = {
  menuIsOpen: bool.isRequired,
  setMenuIsOpen: func.isRequired,
}

export default Header

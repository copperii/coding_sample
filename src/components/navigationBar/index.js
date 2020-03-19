import React from 'react'
import { bool, func, string } from 'prop-types'
import {
  HeaderWrapper,
  StyledHeader,
  NavBar,
  LeftNavBarRegion,
  StyledToggler,
  StyledNavLink,
  StyledHomeLogo,
  CenterNavBarRegion,
  RightNavBarRegion,
  NavBarInfo,
} from './styles'

const NavigationBar = ({ menuIsOpen, setMenuIsOpen, loggedInUsername }) => {
  return (
    <>
      <HeaderWrapper data-testid="navigationBar">
        <StyledHeader>
          <NavBar menuisopen={menuIsOpen}>
            <LeftNavBarRegion>
              <StyledToggler
                data-testid="header-toggler-icon"
                menuisopen={menuIsOpen.toString()}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              />
              <StyledNavLink
                exact
                to="/home"
                activeClassName="selected"
                title="Go to front page"
              >
                <StyledHomeLogo />
              </StyledNavLink>
            </LeftNavBarRegion>
            <CenterNavBarRegion menuisopen={menuIsOpen}>
              <StyledNavLink
                exact
                to="/home"
                activeClassName="selected"
                title="Go to front page"
              >
                Home
              </StyledNavLink>
              <StyledNavLink
                to="/drawonmap"
                activeClassName="selected"
                title="Draw lines and circles on a map"
              >
                Draw on map
              </StyledNavLink>

              <StyledNavLink
                to="/mapping"
                activeClassName="selected"
                title="Here you can map coordinates to map and convert them"
              >
                Map coordinates
              </StyledNavLink>
              <StyledNavLink
                to="/tools"
                activeClassName="selected"
                title="Links to various tools"
              >
                Tools
              </StyledNavLink>

              <StyledNavLink
                to="/about"
                activeClassName="selected"
                title="About this page"
              >
                About
              </StyledNavLink>
              <StyledNavLink
                to="/users"
                activeClassName="selected"
                title="User actions"
              >
                {loggedInUsername ? 'Account' : 'Login'}
              </StyledNavLink>
            </CenterNavBarRegion>
            <RightNavBarRegion>
              <NavBarInfo>
                {loggedInUsername ? (
                  <>current user {loggedInUsername}</>
                ) : (
                  <>Not logged in</>
                )}
              </NavBarInfo>
            </RightNavBarRegion>
          </NavBar>
        </StyledHeader>
      </HeaderWrapper>
    </>
  )
}

NavigationBar.propTypes = {
  menuIsOpen: bool.isRequired,
  setMenuIsOpen: func.isRequired,
  loggedInUsername: string,
}

export default NavigationBar

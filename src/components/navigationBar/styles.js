import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { ReactComponent as HomeLogo } from '../../assets/home.svg'
import { ReactComponent as Toggler } from '../../assets/toggler.svg'

export const HeaderWrapper = styled.section``

export const StyledHeader = styled.header``

export const NavBar = styled.nav`
  display: flex;
  flex-wrap: wrap;
  padding: 1em 1em;
  transform-origin: 1px;
  background: #3cb371;
  border-radius: 7px;
  @media (max-width: 600px) {
    height: ${({ menuisopen }) => (menuisopen ? 'auto' : '1.5em')};
    flex-direction: column;
    flex-flow: column;
  }
`

export const NavBarRegion = styled.div`
  height: '50px';
`

export const LeftNavBarRegion = styled(NavBarRegion)`
  flex-grow: 0.2;
  display: flex;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 600px) {
    padding: 0 1em;
    justify-content: flex-start;
  }
`

export const CenterNavBarRegion = styled(NavBarRegion)`
  flex-grow: 6;
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: space-around;
    transform: ${({ menuisopen }) =>
      menuisopen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`

export const RightNavBarRegion = styled(NavBarRegion)`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 600px) {
    justify-content: flex-start;
    transform: translateX(-100%);
    display: none;
  }
`

export const NavBarInfo = styled.div`
  color: ${props => (props.primary ? 'white' : 'beige')};
  padding: 0 1em;
  &: hover {
    color: black;
  }
`

export const StyledHomeLogo = styled(HomeLogo)`
  height: 1em;
  fill: white;
  &: hover {
    fill: black;
  }
  @media (max-width: 600px) {
    display: none;
  }
`
export const StyledToggler = styled(Toggler)`
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

export const activeClassName = 'active'

export const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  color: white;
  padding: 0 1em;
  text-decoration: none;
  &: hover {
    color: black;
    text-decoration: none;
  }
  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }

  &.${activeClassName} {
    color: #713cb3;
  }
  @media (max-width: 600px) {
    padding: 0.15em 1em;
  }
`

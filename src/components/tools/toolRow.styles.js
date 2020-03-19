import { ReactComponent as MoreIcon } from '../../assets/more.svg'
import styled from 'styled-components'

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border: 0.01em dashed;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Name = styled.div`
  width: 30%;
  margin: 0.5em;
  padding-left: 10px;
  text-decoration: none;
`

export const Description = styled.div`
  width: 60%;
  margin: 0.5em;
`
export const StyledLink = styled.a`
  text-decoration: none;
  color: blue;

  &: hover {
    color: #713cb3;
    text-decoration: none;
  }

  &:focus,
  &:visited,
  &:link {
    text-decoration: none;
  }
`
export const Detail = styled(MoreIcon)`
  justify-content: flex-end;
  width: 20px;
  height: 1em;
  fill: black;

  &: hover {
    fill: #713cb3;
  }
`

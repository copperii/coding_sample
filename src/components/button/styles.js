import styled, { css } from 'styled-components'

export const StyledButton = styled.button`
  border-radius: 7px;
  background-color: ${props => (props.secondary ? '#F7A072' : '#3cb371')};
  color: #fff;
  padding: 10px 20px;
  font-size: ${props => {
    if (props.big) return '20px'
    return '16px'
  }};

  outline: none;
  border: 1px solid #ddd;
  cursor: pointer;
  // margin-top: 1.5em;
  margin-top: ${props => (props.addTopMargin ? '1.5em' : '0')};
  margin-left: ${props => (props.addLeftMargin ? '1.5em' : '0')};
  margin-right: 1.5em;
  margin-down: 1.5em;
  border: 2px solid ${props => (props.secondary ? '#F7A072' : '#3cb371')};
  ${props => {
    return (
      props.inverse &&
      css`
        background-color: #fff;
        color: #3cb371;
      `
    )
  }}
  &:hover {
    background-color: #713cb3;
  }
`

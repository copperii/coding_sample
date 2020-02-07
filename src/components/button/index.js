import React from 'react'
import styled, { css } from 'styled-components'
import Loader from '../layout/loader'

const StyledButton = styled.button`
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
  margin: 15px;
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
// button with tests

const Button = ({
  secondary,
  big,
  inverse,
  loading,
  children,
  label,
  ...props
}) => {
  return (
    <StyledButton
      data-testid="button"
      secondary={secondary}
      big={big}
      inverse={inverse}
      {...props}
    >
      {loading ? <Loader small white /> : children} {label}
    </StyledButton>
  )
}

export default Button

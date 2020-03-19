import React from 'react'
import { string, func, bool } from 'prop-types'
import { StyledInput } from './styles'

const Input = ({ ...props }) => {
  return <StyledInput {...props}></StyledInput>
}

Input.propTypes = {
  id: string,
  value: string,
  placeholder: string,
  error: string,
  hintText: string,
  type: string,
  onChange: func,
  disabled: bool,
  className: string,
}

export default Input

import React, { forwardRef, useState, useImperativeHandle } from 'react'
// import Button from '../button'
import { string } from 'prop-types'
import { SmallButton } from './togglable.styles'

const Togglable = (props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <SmallButton
          onClick={toggleVisibility}
          addTopMargin={props.addTopMargin}
        >
          {props.buttonLabel}
        </SmallButton>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <SmallButton
          onClick={toggleVisibility}
          label="Cancel"
          addTopMargin={props.addTopMargin}
        ></SmallButton>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: string.isRequired,
}

export default forwardRef(Togglable)

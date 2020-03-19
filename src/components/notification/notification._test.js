import React, { useState } from 'react'
import { render } from '@testing-library/react'
import Notification from './index'

const notification = {
  message: 'test message',
  type: 'none',
  time: 0,
}

test('renders content', () => {
  const component = render(<Notification notification={notification} />)
  component.debug()
})

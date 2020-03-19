import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavigationBar from './index'

describe('NavigationBar component', () => {
  test('renders component correctly', async () => {
    const rendered = render(
      <Router>
        <NavigationBar menuIsOpen='false' />
      </Router>
    )
    const toggleContainer = rendered.getByTestId('navigationBar')
    expect(toggleContainer).not.toBeNull()
  })
})

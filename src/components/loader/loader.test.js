import React from 'react'
import { render } from '@testing-library/react'
// import { BrowserRouter as Router } from 'react-router-dom'
import Loader from './index'

describe('Loader component', () => {
  test('renders component correctly', async () => {
    const rendered = render(
      //   <Router>
      <Loader />
      //   </Router>
    )
    const toggleContainer = rendered.getByTestId('loader')
    expect(toggleContainer).not.toBeNull()
  })
})

import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import Footer from './index'

describe('Footer component', () => {
  test('renders component correctly', async () => {
    const rendered = render(
      <Router>
        <Footer />
      </Router>
    )
    const toggleContainer = rendered.getByTestId('footer')
    expect(toggleContainer).not.toBeNull()
  })
})

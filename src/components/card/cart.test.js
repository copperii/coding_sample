import React from 'react'
import { render } from '@testing-library/react'
import Card from './index'

describe('Card component', () => {
  test('renders component correctly', async () => {
    const rendered = render(<Card />)
    const toggleContainer = rendered.getByTestId('card')
    expect(toggleContainer).not.toBeNull()
  })
})

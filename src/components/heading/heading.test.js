import React from 'react'
import Heading from './index'
import { render } from '@testing-library/react'

describe('Heading testing', () => {
  test('renders heading', () => {
    const component = render(<Heading h3>Test h3 heading</Heading>)
    expect(component.container).toHaveTextContent('Test h3 heading')
  })
})

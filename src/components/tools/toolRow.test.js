import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import ToolRow from './toolRow'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Test for toolRow component', () => {
  test('renders content', () => {
    const node = {
      id: '223479238hkjhk',
      url: 'http://localhost:3000',
      name: 'Nice rencering test',
      description: 'a rendering test',
    }

    const component = render(
      <Router>
        <ToolRow node={node} />
      </Router>
    )

    expect(component.container).toHaveTextContent('Nice rencering test')

    const element = component.getByText('a rendering test')
    expect(element).toBeDefined()
  })
})

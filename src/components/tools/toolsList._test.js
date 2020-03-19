import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { create } from 'react-test-renderer'
import ToolsList from './toolsList'

describe('FilterForm testing', () => {
  test('display correct heading', () => {
    const { getByTestId } = render(<ToolsList />)
    expect(getByTestId('toolsList-heading').textContent).toBe('Tool List')
  })
})

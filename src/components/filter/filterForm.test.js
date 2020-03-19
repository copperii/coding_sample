import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { create } from 'react-test-renderer'
import FilterForm from '../components/forms/filterForm'

describe('FilterForm testing', () => {
  test('Displays correct string', () => {
    const { getByTestId } = render(<FilterForm />)
    const input = getByTestId('search-input')
    expect(input.value).toBe('')
    fireEvent.change(input, { target: { value: 'New planet' } })
    expect(input.value).toBe('New planet')
  })

  test('Renders filterForm', () => {
    const { getByTestId } = render(<FilterForm />)
    expect(getByTestId('search-label')).toHaveTextContent('Filter')
  })

  test('Matches the snapshot', () => {
    const filterForm = create(<FilterForm />)
    expect(filterForm.toJSON()).toMatchSnapshot()
  })
})

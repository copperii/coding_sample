import React from 'react'
import Button from './button'
import { render, fireEvent } from '@testing-library/react'
import { create } from 'react-test-renderer'

const defaultProps = {
  onClick: jest.fn(),
  label: 'Submit',
}

describe('Button component', () => {
  test('button renders with correct text', () => {
    const { queryByText, rerender } = render(<Button {...defaultProps} />)
    expect(queryByText('Submit')).toBeTruthy()
    rerender(<Button {...defaultProps} label="Go" />)
    expect(queryByText('Go')).toBeTruthy()
  })

  test('calls correct function on click', () => {
    const onClick = jest.fn()
    const { getByText } = render(<Button {...defaultProps} onClick={onClick} />)
    fireEvent.click(getByText(defaultProps.label))
    expect(onClick).toHaveBeenCalled()
  })

  test('Renders button correctly with testId', () => {
    const { getByTestId } = render(<Button label="test click"></Button>)
    expect(getByTestId('button')).toHaveTextContent('test click')
  })

  test('Renders button correctly after cleanup', () => {
    const { getByTestId } = render(<Button label="test2k"></Button>)
    expect(getByTestId('button')).toHaveTextContent('test2')
  })

  test('Matches the snapshot', () => {
    const button = create(<Button label="newer snapshot" />)
    expect(button.toJSON()).toMatchSnapshot()
  })
})

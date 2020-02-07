import React from 'react'
// import { render } from '@testing-library/react'
import { create } from 'react-test-renderer'
// import Pages from '../index'

const Button = () => {
  return <button>dummy button</button>
}

describe('dummy component for test page', () => {
  test('Matches the snapshot', () => {
    const button = create(<Button />)
    expect(button.toJSON()).toMatchSnapshot()
  })
})

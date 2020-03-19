import React, { useState } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { render } from '@testing-library/react'
import LoginForm from './loginForm'
import { MockedProvider } from '@apollo/react-testing'

const client = useApolloClient()

describe('LoginForm component', () => {
  test('renders correctly', () => {})
})

describe('input element', () => {
  it('renders the default value', () => {
    const initialValues = { email: '' }

    const { getByPlaceholderText } = render(
      <LoginForm initialValues={initialValues} />
    )

    expect(getByPlaceholderText('Email')).toHaveValue('')
  })

  it('renders the correct value', () => {
    const initialValues = { email: '' }

    const { getByPlaceholderText } = render(
      <LoginForm initialValues={initialValues} />
    )

    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'wholy.cow@cowtown.io' },
    })

    expect(getByPlaceholderText('Email')).toHaveValue('wholy.cow@cowtown.io')
  })
})

describe('submit button', () => {
  it('is disabled when the form is not dirty', () => {
    const initialValues = { email: 'wholy.cow@cowtown.io' }

    const { getByText } = render(<LoginForm initialValues={initialValues} />)

    expect(getByText('Login')).toBeDisabled()
  })

  it('is enabled when the form is dirty', () => {
    const initialValues = { email: '' }

    const { getByPlaceholderText, getByText } = render(
      <LoginForm initialValues={initialValues} />
    )

    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'wholy.cow@cowtown.io' },
    })

    expect(getByText('Login')).toBeEnabled()
  })
})

describe('submit button', () => {
  it('calls handleSubmit with the correct values', () => {
    const initialValues = { email: '' }
    const handleSubmit = jest.fn()

    const { getByPlaceholderText, getByText } = render(
      <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
    )

    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'wholy.cow@cowtown.io' },
    })

    fireEvent.click(getByText('Login'))

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'wholy.cow@cowtown.io',
    })
  })
})

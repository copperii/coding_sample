import React from 'react'
import { render, fireEvent } from '@testing-library/react'
// import { create } from 'react-test-renderer'
import Pages from './index'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

test('full app rendering/navigating', () => {
  const history = createMemoryHistory()
  const { container, getByText } = render(
    <Router history={history}>
      <Pages />
    </Router>
  )
  expect(container.innerHTML).toMatch('You are home')

  fireEvent.click(getByText(/about/i))

  expect(container.innerHTML).toMatch('You are on the about page')
})

test('landing on a bad page shows 404 page', () => {
  const history = createMemoryHistory()
  history.push('/some/bad/route')
  const { getByRole } = render(
    <Router history={history}>
      <Pages />
    </Router>
  )
  expect(getByRole('heading')).toHaveTextContent('404 Not Found')
})

test('testing that index file provides header', () => {
  const { getByTestId } = render(
    <Router>
      <Pages />
    </Router>
  )
  const menuTogglerIcon = getByTestId('header-toggler-icon')
  expect(menuTogglerIcon).toHaveTextContent('toggler.svg')
})

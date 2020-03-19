import React, { useState, useEffect } from 'react'
// import Button from '../button'
import Input from '../input'
import { Form, Label, SmallButton } from './styles'
import { string, func } from 'prop-types'

const FilterForm = props => {
  const { filterString, setFilterString } = props
  const [searchString, setSearchString] = useState('')
  const [buttonLabel, setButtonLabel] = useState('Search')

  useEffect(() => {
    if (searchString === '') {
      setButtonLabel('Show all')
    } else {
      setButtonLabel('Search')
    }
  }, [searchString])

  // also possible to move to parent ?
  const submitFilterChange = e => {
    e.preventDefault()
    // query is made once string has changed
    if (searchString === filterString) {
      // console.log('Enter pressed without new data ... clear')
      setButtonLabel('Filter')
      setSearchString('')
      setFilterString('')
    } else {
      setFilterString(searchString)
      setSearchString('')
    }
  }

  return (
    <Form data-testid="search-form" onSubmit={e => submitFilterChange(e)}>
      <Label data-testid="search-label" htmlFor="searchInputText">
        Filter
      </Label>
      <Input
        data-testid="search-input"
        className="searchInputText"
        type="Text"
        placeholder="Enter text to search"
        Value={searchString}
        onChange={({ target }) => setSearchString(target.value)}
      />
      <SmallButton
        data-testid="search-button"
        label={buttonLabel}
        type="submit"
      ></SmallButton>
    </Form>
  )
}

FilterForm.propTypes = {
  filterString: string,
  setFilterString: func,
}

export default FilterForm

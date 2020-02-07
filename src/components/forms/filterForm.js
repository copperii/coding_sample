import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Button from '../button'
import Input from '../input'

const StyledForm = styled.form`
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const StyledLabel = styled.label`
  margin: 5px 10px 5px 0;
`

const FilterForm = props => {
  const { filterString, setFilterString } = props
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    setSearchString(filterString)
    // console.log('useEffect called on FilterForm')
  }, [filterString])

  // also possible to move to parent ?
  const submitFilterChange = e => {
    e.preventDefault()
    // query is made once string has changed
    if (searchString === filterString) {
      // console.log('Enter pressed without new data ... clear')
      setSearchString('')
      setFilterString('')
    } else {
      setFilterString(searchString)
    }
  }

  return (
    <StyledForm data-testid="search-form" onSubmit={e => submitFilterChange(e)}>
      <StyledLabel data-testid="search-label" htmlFor="searchInputText">
        Filter
      </StyledLabel>
      <Input
        data-testid="search-input"
        className="searchInputText"
        type="Text"
        defaultValue={searchString}
        onChange={({ target }) => setSearchString(target.value)}
      />
      <Button data-testid="search-button" label="Search" type="submit"></Button>
    </StyledForm>
  )
}

export default FilterForm

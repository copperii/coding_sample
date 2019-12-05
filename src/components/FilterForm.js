import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import { Form } from 'react-bootstrap'

const FilterForm = (props) => {
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    props.setFilterString(searchString)
  }, [searchString])

  const submit = async (event) => {
  }

  const style = {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 7
  }

  return (
    <div style={style}>
      <Form onSubmit={submit}>
        <Form.Group className="form-group w-50">
          <Form.Label>Filter</Form.Label>
          <Form.Control
            type='Text'
            value={searchString}
            onChange={({ target }) => setSearchString(target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification,
  filterChange

}

export default connect(mapStateToProps, mapDispatchToProps)(FilterForm)

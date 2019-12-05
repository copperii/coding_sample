import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import '../App.css'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AddLinkForm = (props) => {
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [genres, setGenres] = useState('')

  const addThisLink = async (event) => {
    event.preventDefault()
    try {
      await props.addLink({
        variables: { description, url, genres }
      })
    } catch (err) {
      props.setNotification(`Link addition failed`, 'error', 5)
    }
  }

  return (
    <div className="divWithBorder">
      <h5>Give link to add: </h5>
      <Form onSubmit={addThisLink}>
        <Form.Group className="form-group w-50">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <Form.Label>genres</Form.Label>
          <Form.Control
            type='text'
            value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
          <button className="buttonLone" type='submit'>Add this Link</button>
        </Form.Group>
      </Form>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLinkForm)

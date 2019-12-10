import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import '../styles/App.css'
import FilterForm from '../components/FilterForm'
import { connect } from 'react-redux'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import AddLinkForm from '../components/AddLinkForm'
import Togglable from '../components/Togglable'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import * as Queries from '../graphql/Queries'

const Links = (props) => {
  const client = useApolloClient()
  const [filterString, setFilterString] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const [link, setLink] = useState(null)

  props.setCurrentPage('/links')

  const [deleteLink] = useMutation(Queries.DELETE_LINK, {
    onError: props.handleError,
    refetchQueries: [{ query: Queries.ALL_LINKS }]
  })

  if (props.result.loading === true) {
    return <div> loading links...</div>
  }

  const showLink = async (link) => {
    const { data } = await client.query({
      query: Queries.ALL_LINKS,
      variables: {url: link }
    })
    setLink(data.allLinks)
    return null
  }

  const ShowLinkDetails = () => {
    const unxTime = Number(link[0].latestChange)
    const ls = new Date(unxTime)
    return (
      <div>
        <Table className="table w-auto">
          <thead>
            <tr>
              <th> Address </th>
              <th> Description </th>
              <th> Latest change </th>
              <th> Genres </th>
            </tr>
          </thead>
          <tbody>
            <tr key={link[0].url}>
              <td>{link[0].url}</td>
              <td>{link[0].description}</td>
              <td>{ls.toDateString()}</td>
              <td>{link[0].genres}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  const deleteThisLink = async (url) => {
      await deleteLink({
        variables: { url }
      })
  }

  const addDetails = (url) => {
    console.log('inside addDetails', url)
    return (
      <div></div>
    )
  }

  const resetForm = () => {
    setLink(null)
  }

  const ShowLinkData = () => {
    if (filterString !== '') {
      console.log('testpoint1')
      let f = props.result.data.allLinks.filter(filtered =>
        filtered.description.toLowerCase().includes(filterString.toLowerCase().trim()))
      return (
        <Table className="table w-auto">
          <thead>
            <tr>
              <th> Link </th>
              <th> Description </th>
              <th> Added by </th>
              <th> Details </th>
            </tr>
          </thead>
          <tbody>
            {
              f.map(l =>
                <tr key={l.url}>
                  <td>{l.url}</td>
                  <td>{l.description}</td>
                  <td></td>
                  <td><button className="button" onClick={() => showLink(l.url)}>
                    Show details
              </button></td>
                </tr>
              )}
          </tbody>
        </Table>
      )
    }
    if (props.result.data.allLinks !== undefined) {
      return (
        <Table className="table w-auto">
          <thead>
            <tr>
              <th> Link </th>
              <th> Description </th>
              <th> Show Details </th>
                
            </tr>
          </thead>
          <tbody>
            {
              props.result.data.allLinks.map(l =>
                <tr key={l.url}>
                  <td>{l.url}</td>
                  <td onClick={() => setShowDetails(!showDetails)}>{l.description}</td>
                  <td><button className="button" onClick={() => showLink(l.url)}>Show details </button></td>
                    
                </tr>
              )}
          </tbody>
        </Table>
      )}

    return (
      <div>No data</div>
    )
}

  const addLinkFormRef = React.createRef()
  const addLinkForm = () => {
    return (
      <Togglable buttonLabel="Add a link" ref={addLinkFormRef}>
        <AddLinkForm
          addLink={props.addLink}
        />
      </Togglable>
    )
  }

  const ShowWelcome = () => {
    return (
      <div className="text">
        {props.user !== ''
          ?
          <React.Fragment>
            <div className="text"> Welcome <i> {props.user} </i> </div>
            {addLinkForm()}
          </React.Fragment>
          :
          <div className="text"> Only logged in users are allowed to add or edit links.
        </div>}
      </div>
      )
  } 

  if (link) {
    return (
      <div className="topdiv">
        <table className="tableNoBorder w-auto">
          <tbody>
            <tr>
              <td className="tdAddRight"><h4 >{link.url}</h4></td>
              <td> <button className="button" onClick={resetForm}>Show All Links</button></td>
              {props.user !== ''
                ?
                <td>
                  <button className="button" onClick={() => deleteLink(link.url)}>
                    Delete this link
                    </button>
                </td>
                :
                <td></td>
              }
            </tr>
          </tbody>
        </table>
        <div className="text"> Only logged in users are allowed to add or edit links.
        </div>
        <div className="spacer"></div>
        <ShowLinkDetails />
        </div>
    )
  }

  return (
    <div>
      <h4 className="heading">Links</h4>
      <ShowWelcome />
      <FilterForm
        setFilterString={(filterString) => setFilterString(filterString)}
      />
      <ShowLinkData />
    </div>

  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setNotification,
  clearNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)
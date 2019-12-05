const initialState = ''

export const clearNotification = () => (
  {
    type: 'CLEAR_NOTIFICATION'
  }
)

export const setNotification = (message, type = 'success', timeToShow = 3) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data:
      {
        message,
        type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeToShow * 1000)
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [action.data]
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export default notificationReducer
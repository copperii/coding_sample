const initialState = ''

export const clearCurrentUser = () => (
  {
    type: 'CLEAR_USER',
    user: ''
  }
)

export const setCurrentUser = (user) => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user
    })
  }
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      state = action.user
      return [action.user]
    case 'CLEAR_USER':
      state = ''
      return ''
    default:
      return state
  }
}

export default userReducer
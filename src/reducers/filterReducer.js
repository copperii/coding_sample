const initialState = ''

export const filterChange = (value) => {
  return {
    type: 'SET_FILTER',
    data: {
      value
    }
  }
}



const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return [action.data.value]
    default:
      return state
  }
}

export default filterReducer
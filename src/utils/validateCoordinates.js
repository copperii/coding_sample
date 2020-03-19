//import React from 'react'

const validateCoordinates = inputString => {
  const Coordinates = require('coordinate-parser')
  // supported format seen at https://www.npmjs.com/package/coordinate-parser
  try {
    const position = new Coordinates(inputString)
    return position
  } catch (error) {
    console.log('parser error: ', error)
    return 0
  }
}

export default validateCoordinates

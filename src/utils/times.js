import { string } from 'prop-types'

export const getCurrentDate = (separator = '.') => {
  const newDate = new Date()
  const date = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  return `${date}${separator}${month}${separator}${year}`
}

export const getCurrentDateUS = (separator = '-') => {
  const newDate = new Date()
  const date = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`
}

export const getCurrentTime = (separator = ':') => {
  const newDate = new Date()
  const hour = newDate.getHours()
  const minutes = newDate.getMinutes()

  return `${hour}${separator}${minutes < 10 ? `0${minutes}` : `${minutes}`}`
}

export const getCurrentSeconds = () => {
  const newDate = new Date()
  const seconds = newDate.getSeconds()

  return `${seconds}`
}

// returns unix timeStamp
export const getCurrentUTC = () => {
  const newDate = new Date()
  return newDate.getTime()
}

getCurrentDate.propTypes = {
  separator: string,
}

getCurrentTime.propTypes = {
  separator: string,
}

export default { getCurrentTime, getCurrentDate }

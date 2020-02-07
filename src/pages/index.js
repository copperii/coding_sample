import React, { useState } from 'react'
import Header from '../components/layout/header'
import GlobalStyle from '../styles/globalStyle'
import Routes from '../routes'

const Pages = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  return (
    <>
      <GlobalStyle />
      <Header menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <Routes />
    </>
  )
}

export default Pages

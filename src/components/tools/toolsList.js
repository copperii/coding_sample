import React, { useState, useEffect } from 'react'
import Heading from '../heading'
import ToolRow from './toolRow'
import { TitleRow, Name, Description, Detail } from './tools.styles'
import { Section, Text } from '../../styles/globalStyle'

const ToolsList = ({ entries, onLoadMore }) => {
  const [scrolling, setScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [loadAMore, setLoadAMore] = useState(false)
  const [firstTime, setFirstTime] = useState(true)
  const [lastCursor, setLastCursor] = useState('')
  const [usedCursor, setUsedCursor] = useState('')
  const [delayLoop, setDelayLoop] = useState(false)

  useEffect(() => {
    // fix the situation of initial list being less than window height
    if (window.innerHeight >= document.documentElement.offsetHeight) {
      setLoadAMore(true)
    }
  }, [])

  useEffect(() => {
    // one way to delay too fast execution ?
    setDelayLoop(false)
    setTimeout(() => {
      setLoadAMore(true)
    }, 300)
  }, [delayLoop])

  useEffect(() => {
    if (firstTime) {
      setFirstTime(false)
      return undefined
    }
    setLoadAMore(false)
    if (usedCursor === lastCursor) {
      //console.log('skip duplicate call')
    } else {
      setUsedCursor(lastCursor)
      onLoadMore(lastCursor)
    }
    // page still not filled ... very long initial page
    if (window.innerHeight >= document.documentElement.offsetHeight) {
      // console.log('page not filled yet')
      if (entries.pageInfo && entries.pageInfo.hasNextPage) {
        setDelayLoop(true)
      }
    }
  }, [
    loadAMore,
    firstTime,
    lastCursor,
    onLoadMore,
    usedCursor,
    entries.pageInfo,
    entries.pageInfo.hasNextPage,
  ])

  useEffect(() => {
    setLastCursor(entries.pageInfo.endCursor)
    //console.log('New last cursor set')
  }, [entries])

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop)
      setScrolling(e.target.documentElement.scrollTop > scrollTop)
      if (
        e.target.documentElement.scrollTop +
          e.target.documentElement.clientHeight >=
        e.target.documentElement.scrollHeight - 10
      ) {
        setLoadAMore(true)
      }
    }
    window.addEventListener('scroll', onScroll)

    // This cleans up the event handler when the component unmounts.
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTop, scrolling])

  return (
    <>
      <Section marginTop='true'>
        <Heading h5 data-testid='toolsList-heading'>
          Tool List
        </Heading>
        <Text></Text>
        <TitleRow>
          <Name>Link</Name>
          <Description>Description</Description>
          <Detail>Details</Detail>
        </TitleRow>
        {entries.edges.map(edge => {
          const node = edge.node
          return <ToolRow key={node.id} node={node} />
        })}
      </Section>
    </>
  )
}

export default ToolsList

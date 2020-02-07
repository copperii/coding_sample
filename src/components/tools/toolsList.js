import React, { useState, useEffect } from 'react'
import Heading from '../heading'
import ToolRow from './toolRow'

const ToolsList = ({ entries, onLoadMore }) => {
  // const { entries, onLoadMore } = props
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
      <Heading h5 data-testid="toolsList-heading">
        Tool List
      </Heading>

      {entries.edges.map(edge => {
        const node = edge.node
        return <ToolRow key={node.id} node={node} />
      })}
    </>
  )
}

export default ToolsList

// {
//   /* <table>
// <thead>
//   <tr>
//     <td width="30%"> Link name </td>
//     <td> Description </td>
//     <td> Details and edit </td>
//   </tr>
// </thead>

// <tbody id="list">
// </tbody>
//       </table>
//  */
// }

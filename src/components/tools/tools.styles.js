import styled from 'styled-components'
import Button from '../button'

export const TitleRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  border: 0.01em dashed;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    display: none;
  }
`
export const Name = styled.div`
  width: 30%;
  margin: 0.5em;
  padding-left: 10px;
  font-weight: bold;
`

export const Description = styled.div`
  width: 60%;
  margin: 0.5em;
  font-weight: bold;
`

export const Detail = styled.div`
  font-weight: bold;
`
export const SmallButton = styled(Button)`
  font-size: 14px;
  padding: 4px 12px;
`

export const Row = styled.div`
  display: flex;
  flex-flow: column wrap;
`

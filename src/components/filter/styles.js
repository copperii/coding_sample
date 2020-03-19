import styled from 'styled-components'
import Button from '../button'

export const Form = styled.form`
  display: flex;
  flex-flow: row wrap;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Label = styled.label`
  margin: 5px 10px 5px 0;
`
export const SmallButton = styled(Button)`
  font-size: 14px;
  padding: 4px 12px;
`

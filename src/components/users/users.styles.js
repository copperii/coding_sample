import styled from 'styled-components'

export const Section = styled.section`
  margin-top: 20px;
`

export const Row = styled.div`
  display: flex;
  flex-flow: column wrap;
`

export const Form = styled.form`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Label = styled.label`
  margin: 5px 10px 5px 0;
`
export const ButtonRow = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const Text = styled.div`
  align-self: center;
`

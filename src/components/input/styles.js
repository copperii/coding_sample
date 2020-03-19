import styled from 'styled-components'

export const StyledInput = styled.input`
  vertical-align: middle;
  margin: 5px 10px 5px 0;
  padding: 10px;
  background-color: #d8efe2;
  border: 1px solid #ddd;
  border-radius: 7px;
  width: 500px;

  @media (max-width: 800px) {
    align-item: stretch;
    width: auto;
  }
`

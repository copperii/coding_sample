import styled, { keyframes } from 'styled-components'

export const Bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
`

export const DotsLoader = styled.div`
  display: inline-block;
`

export const Dot = styled.span`
  width: ${props => (props.big ? '20px' : '12px')};
  height: ${props => (props.big ? '20px' : '12px')};
  background-color: ${props => (props.white ? '#FFF' : '#000')};
  border-radius: 100%;
  display: inline-block;
  animation: ${Bounce} 1s infinite ease-in-out both;
  &:first-child {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`

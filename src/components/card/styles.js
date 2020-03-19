import styled, { css } from 'styled-components'

const animatedCss = css`
  opacity: 1;
  transform: translateY(0);
`

const primaryCss = css`
  background-color: #008bf8;
  color: #fff;
`

export const StyledCard = styled.div`
  width: ${props => (props.big ? '650px' : '300px')};
  padding: 15px;
  opacity: 0;
  transform: translateY(50px);
  transition: 500ms all ease-in-out;
  margin: ${props => (props.noMargin ? 0 : '15px')};
  margin-top: ${props => (props.noMarginTop ? 0 : '15px')};

  border-radius: 5px;
  ${props => props.animated && animatedCss}
  ${props =>
    props.primary && primaryCss}
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 1);
  &: hover {
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
  }
`

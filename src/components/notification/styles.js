import styled from 'styled-components'

export const Success = styled.div`
  background-color: white;
  color: creen;
  position: absolute;
  top: 20%;
  left: 20%;
  margintop: 15px;
  border: 'dotted';
  padding: 10px;
  borderwidth: 1;
  border-radius: 7px;
`
export const Error = styled.div`
  background-color: white;
  color: red;
  position: absolute;
  top: 20%;
  left: 20%;
  margintop: 15px;
  border: 'solid';
  padding: 10px;
  borderwidth: 1;
  border-radius: 7px;
`
export const Info = styled.div`
  background-color: white;
  position: absolute;
  top: 20%;
  left: 20%;
  margintop: 15px;
  border: 'none';
  padding: 10px;
  borderwidth: 0;
  border-radius: 5px;
`
export const Modal = styled.div`
  display: block;
  margintop: 15px;
  border: 'none';
  padding: 10px;
  borderwidth: 0;
  border-radius: 5px;
  z-index: 1;
`

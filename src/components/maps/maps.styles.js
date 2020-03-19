import styled from 'styled-components'
import Input from '../input'
import { FaEdit } from 'react-icons/fa'
import { Map } from 'react-leaflet'
import Button from '../button'

export const Section = styled.section`
  margin-top: 20px;
`

export const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const SmallButton = styled(Button)`
  font-size: 14px;
  padding: 4px 12px;
`

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
  margin-left: ${props => (props.center ? '1.5em' : '0')};
`
export const ButtonRow = styled.div`
  display: flex;
  flex-flow: row wrap;
`
export const Text = styled.div`
  align-self: center;
`
export const EditIcon = styled(FaEdit)`
  margin-left: 10px;
`
export const DeleteRow = styled(Input)`
  margin-left: 20px;
  width: 10px;
`
export const DrawCheckbox = styled(Input)`
  margin-left: 0.5em;
  width: 15px;
`

export const CoordinateRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  min-height: 1.8em;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const CoordinateText = styled.div`
  width: 30ch;
`
export const DatumLabel = styled.div`
  margin-left: 1em;
  width: 12ch;
`
export const Datum = styled.div`
  margin-left: 1em;
  width: 10ch;
`
export const LineLabel = styled.div`
  margin-left: 1em;
  width: 12ch;
`
export const FiveChText = styled.div`
  margin-left: 1em;
  width: 5ch;
`
export const EightChText = styled.div`
  margin-left: 1em;
  width: 8ch;
`
export const TenChText = styled.div`
  margin-left: 1em;
  width: 10ch;
`
export const ElevenChText = styled.div`
  margin-left: 1em;
  width: 11ch;
`
export const TwelveChText = styled.div`
  margin-left: 1em;
  width: 12ch;
`
export const TwentyTwoChText = styled.div`
  margin-left: 1em;
  width: 22ch;
`
export const DirectionDatum = styled.div`
  margin-left: 1em;
  width: 10ch;
`
export const DataRow = styled.div`
  padding: 0.5em 0;
`
export const InfoText = styled.div`
  padding: 0.5em 0;
`

export const StyledMap = styled(Map)`
  cursor: crosshair;
  width: 100%;
  height: 480px;
`
export const Option = styled.option`
  background-color: #d8efe2;
`
export const Select = styled.select`
  border-radius: 7px;
  background-color: #d8efe2;
  margin-right: 10px;
`

export const NarrowInput = styled(Input)`
  width: 150px;
`
export const NumberInput = styled(Input)`
  width: 70px;
`

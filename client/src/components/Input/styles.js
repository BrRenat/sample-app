import styled from 'styled-components'
import theme from 'utils/theme'

export const InputContainer = styled.div`
  border: 1px solid #e2e2e4;
  color: #333;
  width: 100%;
  font-size: 14px;
  background-color: #fff;
  position: relative;
  height: 38px;
  margin-bottom: 30px;
`

export const InputField = styled.input`
  padding: 7px 12px;
  height: 36px;
  border: none;
  font-size: 16px;
  width: 100%;
  outline: none;
`

export const InputPopup = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 13px;
  
  color: ${props => props.error ? theme.color.Danger : theme.color.Warning};
`

export const InputLabel = styled.div`
  font-size: 13px;
  position: absolute;
  color: #767676;
  top: -20px;
  left: 0;
`

import styled, { css } from 'styled-components'

const Button = styled.button`
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  font-size: 18px;
  
  width: 100%;
  max-width: 480px;
  
  outline: none;
  border: none;

  padding: 10px 31px;
  margin-bottom: 8px;
  
  text-align: center;
  
  box-sizing: border-box;
  
  border-radius: 8px;
  
  color: #2a333d;
  background: #fff;

  ${props => props.disabled && css`
    opacity: 0.2;
  `}
  
  // fix click event bug in WebKit https://stackoverflow.com/a/15698643
  span {
    pointer-events: none;
  }
`

export default Button

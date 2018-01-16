import Button from 'components/Button'

const ButtonPrimary = Button.extend`
  color: #fff;
  background: ${props => props.disabled ? '#e3ecf6' : '#356aff'};
  opacity: 1;
`

export default ButtonPrimary

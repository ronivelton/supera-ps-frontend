import {button} from './Button.module.css'

export const Button = ({type, children}) => {
  return (
    <button type={type} className={button}>{children}</button>
  )
}
import DatePicker, { registerLocale } from 'react-datepicker'

import ptBR from "date-fns/locale/pt-BR"
registerLocale('ptBR', ptBR)

import 'react-datepicker/dist/react-datepicker.css'

import styles from './InputDate.module.css'

export const InputDate = ({date, setDate, placeholder}) => {

  return (
    <div>
      <DatePicker
    className={styles.inputDate}
    selected={date}
    onChange={(date) => setDate(date)}
    placeholderText={placeholder}
    locale="ptBR"
    showTimeSelect
    timeFormat="p"
    timeIntervals={5}
    dateFormat="Pp"
    
  />
    </div>
    
  )
}
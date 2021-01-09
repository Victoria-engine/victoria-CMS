import React from 'react'
import classes from './styles.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DatePickerWrappertProps as Props } from '../../types'


const DatePickerWrapper: React.FC<Props> = ({
  date,
  disabled,
  onDateChange,
}) => {

  return (
    <DatePicker
      selected={date}
      onChange={onDateChange}
      popperClassName={classes.datePickerPopper}
      className={classes.datePicker}
      wrapperClassName={classes.dateWrapper}
      placeholderText='Date'
      dateFormat='dd/MM/yyyy'
      disabled={disabled}
    />
  )
}

export default DatePickerWrapper
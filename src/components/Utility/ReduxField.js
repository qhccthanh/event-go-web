import React from 'react';
import { DatePicker, TextField, TimePicker, SelectField, Checkbox,RadioButtonGroup  } from 'material-ui';

export const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

export const renderDatePicker = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <DatePicker
    onChange={(a,date,c) => {
        input.onChange(date)
    }}
    {...custom}
    />
)

export const renderTimePicker= ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <TimePicker
    onChange={(a,time,c) => {
        input.onChange(time)
    }}
    {...custom}/>
)

export const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

export const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup {...input} {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}/>
)

export const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}/>
)


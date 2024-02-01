import React from 'react';
import { TimePickerComponent } from '../../Components/Datepicker/Timepicker';
import moment from 'moment';

export const TimePicker = ({ value, onChange, component }) => {
  // moment(date).format(selectedDateFormat)
  console.log('value---', value);

  const currentDay = moment().format('YYYY-MM-DD');
  const dateTimeString = `${currentDay} ${value}`;
  const dateObject = moment(dateTimeString, 'YYYY-MM-DD hh:mm').toDate();

  console.log('try----', component.component.definition.properties.enableTwentyFourHour.value ? `HH:mm a` : `hh:mm a`);
  return (
    <div className="xxx">
      <TimePickerComponent
        selected={value && moment(dateObject.toISOString()).toDate()}
        // handleChange={onChange}
        timeFormat={
          component.component.definition.properties.enableTwentyFourHour.value == '{{true}}' ? `HH:mm a` : `hh:mm a`
        }
        onChange={(value) => {
          //   onDateChange(date);
          //   setShowValidationError(true);
          //   setDate(date);
          //   const dateString = computeDateString(date);
          //   setExposedVariable('value', dateString);
          //   fireEvent('onSelect');
          console.log('valuex----', value, moment(value).toDate(), moment(value).format('hh:mm'));
          onChange(moment(value).format('hh:mm'));
        }}
        enableTime={true}
      />
    </div>
  );
};

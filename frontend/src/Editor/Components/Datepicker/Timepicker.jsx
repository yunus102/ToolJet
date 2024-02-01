import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-unresolved
import DatePickerComponent from 'react-datepicker';

export const TimePickerComponent = function TimePickerComponent({
  enableTime,
  timeFormat,
  onChange,
  selected,
  maxTime,
  minTime,
  value,
}) {
  return (
    <div>
      <DatePickerComponent
        selected={selected}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat={timeFormat}
        maxTime={maxTime}
        timeFormat={timeFormat}
        minTime={minTime}
        timeInputLabel=""
        className="timepicker-validation"
      />
    </div>
  );
};

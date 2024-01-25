import React, { useState } from 'react';
// eslint-disable-next-line import/no-unresolved
import TimePicker from 'react-time-picker';

export const TimePickerComponent = function TimePickerComponent() {
  const [value, onChange] = useState('10:00');

  return (
    <div>
      <TimePicker onChange={onChange} value={value} clearIcon clockIcon={null} disableClock />
    </div>
  );
};

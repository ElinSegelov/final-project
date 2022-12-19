import React, { useState } from 'react'
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const EventCalender = () => {
  const [startDate, setStartDate] = useState(new Date());

  const onChange = (date) => {
    setStartDate(date);
  };
  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      inline />
  );
};

export default EventCalender;

import React from 'react';
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

type DatePickerProps = {
  startDate: Dayjs;
  setStartDate: (date: Dayjs) => void
}

const DatePicker = ({ startDate, setStartDate }: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        showToolbar={false}
        value={startDate}
        onChange={(date) => setStartDate(date!)}
        renderInput={(params) => <TextField {...params} />}
        componentsProps={{ actionBar: { sx: { display: 'none' } } }}
      />
    </LocalizationProvider>
  );
}

export default React.memo(DatePicker);
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import './css/app.css';

const App = () => {
  const [startDate, setStartDate] = React.useState<Dayjs>(dayjs(new Date()));
  const [currentFact, setCurrentFact] = React.useState<string | null>(null);

  // request new date fact on date change
  React.useEffect(() => {
    fetch(`http://numbersapi.com/${startDate.month() + 1}/${startDate.date()}/date`)
      .then(res => res.text())
      .then(data => setCurrentFact(data))
      .catch(e => console.log(e))
  }, [startDate])

  return (
    <div id='flex-container'>
      <h1 id='title'>Fact Calendar</h1>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          showToolbar={false}
          value={startDate}
          onChange={(newValue) => setStartDate(newValue!)}
          renderInput={(params) => <TextField {...params} />}
          componentsProps={{ actionBar: { sx: { display: 'none' } } }}
        />
      </LocalizationProvider>

      <p id='currentFact'>{currentFact}</p>
    </div>
  );
}

export default App;
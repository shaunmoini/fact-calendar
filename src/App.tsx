import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import FavouriteButton from './components/FavouriteButton';

// import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-date-pickers-pro/themeAugmentation';
import './css/app.css';

const App = () => {
  const [startDate, setStartDate] = React.useState<Dayjs>(dayjs(new Date()));
  const [currentFact, setCurrentFact] = React.useState<string | null>(null);
  const [favouriteFacts, setFavouriteFacts] = React.useState<string[]>([]);

  // request new date fact on date change
  React.useEffect((): void => {
    fetch(`http://numbersapi.com/${startDate.month() + 1}/${startDate.date()}/date`)
      .then(res => res.text())
      .then(data => setCurrentFact(data))
      .catch(e => console.log(e))
  }, [startDate])

  // adds current fact to list of favourite facts
  const addToFavourites = (): void => {
    if (!favouriteFacts.includes(currentFact!)) {
      setFavouriteFacts(favouriteFacts => [...favouriteFacts, currentFact!]);
    }
  }

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
      <div id='factContainer'>
        <p>{currentFact}</p>
        <FavouriteButton onClick={addToFavourites}></FavouriteButton>
      </div>
      {/* <p style={{color: 'white', flex: 0.6, textAlign:'center'}}>{favouriteFacts}</p> */}
    </div>
  );
}

export default App;
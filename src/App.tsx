import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';

import CustomButton from './components/CustomButton';
import FavouritesList from './components/FavouritesList';
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
      toast.info('Fact saved to favourites')
    }
    else {
      toast.info('Fact already saved to favourites')
    }
  }

  // removes a selected fact from favourites list
  const removeFromFavourites = (item: string): void => {
    setFavouriteFacts(favouriteFacts.filter(((fact) => { return fact !== item })));
    toast.info('Fact removed from favourites');
  }

  // clears favourites list
  const clearFavourites = (): void => {
    setFavouriteFacts([]);
    toast.info('Favourite facts cleared');
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
        <span>{currentFact}</span>
        <CustomButton text={'Favourite'} icon={<StarIcon />}onClick={addToFavourites}></CustomButton>
      </div>
      <FavouritesList data={favouriteFacts} itemOnClick={removeFromFavourites} />
      <CustomButton text={'Clear Favourites'} icon={<CancelIcon />}onClick={clearFavourites}></CustomButton>
      <ToastContainer />
    </div>
  );
}

export default App;
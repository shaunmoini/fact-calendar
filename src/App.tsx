import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import StarIcon from '@mui/icons-material/Star';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DatePicker from './components/DatePicker';
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
      .catch(e => console.log(e));
  }, [startDate]);

  // adds current fact to list of favourite facts
  const addToFavourites = React.useCallback((): void => {
    if (!favouriteFacts.includes(currentFact!)) {
      setFavouriteFacts(favouriteFacts => [...favouriteFacts, currentFact!]);
      toast.info('Fact saved to favourites');
    }
    else {
      toast.info('Fact already saved to favourites');
    }
  }, [currentFact, favouriteFacts]);

  // removes a selected fact from favourites list
  const removeFromFavourites = React.useCallback((item: string): void => {
    setFavouriteFacts(favouriteFacts.filter(((fact) => { return fact !== item })));
    toast.info('Fact removed from favourites');
  }, [favouriteFacts]);

  // clears favourites list
  const clearFavourites = React.useCallback((): void => {
    setFavouriteFacts([]);
    toast.info('Favourite facts cleared');
  }, []);

  // download favourite facts as a text file
  const saveFavouriteFacts = () => {
    if (favouriteFacts.length > 0) {
      let textDoc = document.createElement('a');
      textDoc.href = 'data:attachment/text,' + encodeURI(favouriteFacts.join('\n'));
      textDoc.download = 'favouriteFacts.txt';
      textDoc.click();
      toast.info('Favourite facts downloaded');
    }
    else {
      toast.info('No facts have been favourited yet');
    }
  }

  return (
    <div id='flex-container'>
      <h1 id='title'>Fact Calendar</h1>
      <DatePicker startDate={startDate} setStartDate={setStartDate} />
      <div id='factContainer'>
        <span>{currentFact}</span>
        <Button
          variant="contained"
          endIcon={<StarIcon />}
          onClick={addToFavourites}>
          Favourite
        </Button>
      </div>
      <FavouritesList data={favouriteFacts} itemOnClick={removeFromFavourites} />
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button endIcon={<CancelIcon />} onClick={clearFavourites}>
          Clear Favourites
        </Button>
        <Button endIcon={<DownloadForOfflineIcon />} onClick={saveFavouriteFacts}>
          Download Favourites
        </Button>
      </ButtonGroup>
      <ToastContainer />
    </div>
  );
}

export default App;
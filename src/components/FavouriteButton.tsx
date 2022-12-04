import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

type FavouriteButtonProps = {
  onClick: () => void;
}

const FavouriteButton = ({onClick}: FavouriteButtonProps) => {
  return (
    <Button
      variant="contained"
      endIcon={<StarIcon />}
      onClick={onClick}>
      Favourite
    </Button>
  );
}

export default FavouriteButton;
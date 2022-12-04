import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

type FavouritesListProps = {
  data: string[];
  itemOnClick: (item: string) => void;
}

const FavouritesList = ({ data, itemOnClick }: FavouritesListProps) => {
  const listStyle = {
    flex: 1,
    width: '85%',
    maxWidth: 800,
    minWidth: 315,
    maxHeight: 400,
    minHeight: 250,
    marginBottom: 2,
    overflow: 'auto',
    bgcolor: 'background.paper',
  } as const;

  const listItemStyle = {
    paddingRight: 10,
    borderTop: 1,
    borderColor: 'lightgray'
  } as const;

  return (
    <List sx={listStyle} subheader={<ListSubheader>{'Favourite Facts'}</ListSubheader>}>
      {data.map((value) => (
        <ListItem
          key={value}
          sx={listItemStyle}
          secondaryAction={<IconButton sx={{ color: '#2979ff' }} onClick={() => itemOnClick(value)}><CancelIcon /></IconButton>}
        >
          <ListItemText primary={value} />
        </ListItem>
      ))}
    </List>
  );
}

export default React.memo(FavouritesList);
import { useState } from 'react';
import { 
  Box ,
  Sheet,
} from '@mui/joy';

import { useNavigate, useLocation } from 'react-router-dom';
import catalog from '../config/catalog.json';

const css = {
  "main": {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flexWrap: 'wrap',
  },
  "category": {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '20vh',
    minWidth: '20vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    "&:hover": {
      color:  '#000000',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#FF9900',
    },
  },
};

const Catalog = () => {
  const navigate = useNavigate();
  const handleNavigate = (url) => navigate(url);

  return (
    <Sheet
      sx={css.main}
    >
      {catalog?.map((item, index) => {
        return (
          <Box
            key={index}
            sx={css.category}
            onClick={() => handleNavigate(item.url)}
          >
            {item?.name}
          </Box>
        )
      })}
    </Sheet>
  );
};
export default Catalog;
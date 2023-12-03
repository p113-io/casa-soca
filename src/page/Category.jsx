import { 
  Box ,
  Sheet,
  Button
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
  "import": {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '20vh',
    minWidth: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    "&:hover": {
      color:  '#000000',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#FF0055',
    }
  },
  "api": {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
    minWidth: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    "&:hover": {
      color:  '#000000',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#FF9966',
    }
  },
  "db": {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
    minWidth: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    "&:hover": {
      color:  '#000000',
      fontWeight: 'bold',
      cursor: 'pointer',
      backgroundColor: '#FF9922',
    }
  },
  "tools": {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '20vh',
    minWidth: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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

const Category = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const handleNavigate = (url) => navigate(url);
  const category = catalog.filter((item) => (item.url === path))[0];
  const items = category?.items;
  const color="primary";
  const variant="soft";
  return (
     <Sheet
      sx={css.main}
    >
      {items?.map((item, index) => {
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
      {!items &&
        <Sheet
          sx={css.tools}
        >
          <Box 
            sx={css.import}
          >
            <Button
              variant={variant}
              color={color}
            >
              Import from file  {path.replace('/catalog/', '')}
            </Button>
          </Box>
          <Box 
            sx={css.api}
          >
            <Button
              variant={variant}
              color={color}
            >
              Import from API  {path.replace('/catalog/', '')}
            </Button>
          </Box>
               <Box 
            sx={css.db}
          >
            <Button
              variant={variant}
              color={color}
            >
              Import from local DB  {path.replace('/catalog/', '')}
            </Button>
          </Box>
          <Box
              sx={css.category}
              onClick={() => handleNavigate('/catalog')}
            >
              All
            </Box>
        </Sheet>
      }
    </Sheet>
  );
};
export default Category;
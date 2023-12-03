import {css} from '../layout/css';
import { useNavigate } from 'react-router-dom';

import {
  Sheet,
  Typography,
  Button,
  Stack
} from '@mui/joy';

const Home = () => {
  const variant ="soft";
  const color="primary";
  const navigate = useNavigate();

  return (
    <Sheet
      variant={variant}
      color={color}
      sx={css.main}
    >
      <Typography variant="h1">Home</Typography>
      <Stack
        variant={variant}
        color={color}
        direction="column"
        spacing={2}
      >
      
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => window.open('https://git.pulsar113.org/P113/casa-soca', '_blank')}
        >
          Code Source
        </Button>
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => window.open('https://git.pulsar113.org/P113/casa-soca/wiki', '_blank')}
        >
          Wiki Documentation
        </Button>
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => window.open('https://git.pulsar113.org/P113/casa-soca/wiki/ToDo', '_blank')}
        >
          ToDo
        </Button>
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => navigate('/fbx')}
        >
          Casa Soca en FBX
        </Button>
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => navigate('/obj')}
        >
          Casa Soca en OBJ
        </Button>
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => navigate('/gltf')}
        >
          Casa Soca en GLTF
        </Button>
        <Button
          variant={variant}
          color={color}
          sx={css.btn}
          onClick={() => navigate('/jsx')}
        >
          Casa Soca en JSX
        </Button>

      </Stack>
    </Sheet>
  )
};
export default Home;
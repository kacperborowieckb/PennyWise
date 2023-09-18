import Stack from '@mui/material/Stack';
import { Outlet } from 'react-router';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Layout = () => {
  return (
    <>
      <Stack component={'nav'} direction={'row'} m={'32px 0'} spacing={2}>
        <Button href="/" variant="contained">
          Home Page
        </Button>
        <Button href="joke" variant="contained">
          Joke Page
        </Button>
      </Stack>
      <Divider sx={{ width: '100%' }} />
      <Stack
        component={'main'}
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        flexGrow={1}
      >
        <Outlet />
      </Stack>
    </>
  );
};

export default Layout;

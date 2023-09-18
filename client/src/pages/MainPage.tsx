import { Box, Typography } from '@mui/material';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import Stack from '@mui/material/Stack';
import Counter from '../components/counter/Counter';

const MainPage = () => {
  return (
    <>
      <Stack sx={{ '> a > img': { height: 100 } }} direction="row" spacing={8}>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Stack>
      <Typography component="h1" variant="h4">
        Vite + React + TS + MUI
      </Typography>
      <Box>
        <Typography>
          Edit <code>src/App.tsx</code> and save to test HMR
        </Typography>
      </Box>
      <Typography>Click on the Vite and React logos to learn more</Typography>
      <Counter />
    </>
  );
};

export default MainPage;

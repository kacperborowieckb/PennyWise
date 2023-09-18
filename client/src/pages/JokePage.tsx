import Typography from '@mui/material/Typography/Typography';
import Stack from '@mui/material/Stack/Stack';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useGetRandomJokeQuery } from '../features/api/apiSlice';

const JokePage = () => {
  const { data, error, isLoading } = useGetRandomJokeQuery();

  return (
    <Stack maxWidth={280} spacing={2} textAlign={'center'}>
      <Typography component={'h1'} variant="h4">
        Joke:
      </Typography>
      {isLoading && <CircularProgress />}
      {error && <Typography>Error.</Typography>}
      {data && <Typography>{data}</Typography>}
    </Stack>
  );
};

export default JokePage;

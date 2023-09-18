import { Button, Stack, Typography } from '@mui/material';
import welcomePageImg from '../assets/welcome-page-img.svg';

const WelcomePage = () => {
  return (
    <Stack
      sx={{
        maxWidth: 500,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        textAlign: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        component={'h1'}
        sx={{
          backgroundcolor: 'primary',
          backgroundImage: `linear-gradient(45deg, #fd492182, #FD4A21 )`,
          backgroundSize: '100%',
          backgroundRepeat: 'repeat',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Welcome to PenyWise!
      </Typography>
      <img src={welcomePageImg} alt="welcome page image finance app" style={{ height: 150 }} />
      <Typography variant="subtitle1" component={'p'}>
        Your financial companion for effortless money management. Track expenses, set budgets, and
        reach your financial goals with ease.
      </Typography>
      <Stack sx={{ flexDirection: 'row', gap: 4 }}>
        <Button variant="contained" size="large" href="/signin">
          Sign in
        </Button>
        <Button variant="contained" size="large" href="/signup">
          Sign up
        </Button>
      </Stack>
    </Stack>
  );
};

export default WelcomePage;

import { Box, Link, Typography } from '@mui/material';
import errorImg from '../../assets/error-img.svg';

const SignInAgain = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <img src={errorImg} alt="error img" height={200} width={200} />
      <Typography component={'h2'} variant="h6">
        Please
        <Link href={'/signin'} sx={{ fontStyle: 'italic', pl: 1 }}>
          sign in again
        </Link>
      </Typography>
    </Box>
  );
};

export default SignInAgain;

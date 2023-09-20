import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import signUpPageImg from '../assets/signup-page-img.svg';
import { useRegisterMutation } from '../features/auth/authApiSlice';

type Error = {
  status: number;
  data: unknown;
};

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };
  const clearError = () => setError(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await register({ username, password }).unwrap();
      clearInputs();
      navigate('/signin');
    } catch (err) {
      const knownError = err as Error;
      if (!knownError?.status) {
        setError('No Server Response');
      } else if (knownError.status === 400) {
        setError('Missing Username or Password');
      } else if (knownError.status === 409) {
        setError('Username is taken');
      } else {
        setError('Register Failed');
      }
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Stack
        component={'form'}
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          maxWidth: 320,
          gap: 2,
          border: '1px solid',
          borderColor: (theme) => theme.palette.primary.main,
          borderRadius: 2,
        }}
      >
        {error && (
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={Boolean(error.length)}
            autoHideDuration={4000}
            onClose={clearError}
          >
            <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          </Snackbar>
        )}
        <img src={signUpPageImg} alt="sign in illustration" style={{ height: 100 }} />
        <Typography
          sx={{ color: (theme) => theme.palette.primary.main }}
          component={'h2'}
          variant="h6"
          align="center"
        >
          Sign up
        </Typography>
        <TextField
          variant="outlined"
          label="Username"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <TextField
          variant="outlined"
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button variant="contained" type="submit" sx={{ height: '36px' }}>
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Sign up'}
        </Button>
        <Typography component={'p'} variant="body1">
          Already have an account?
          <Link href={'/signup'} sx={{ fontStyle: 'italic' }}>
            Sign in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignUp;

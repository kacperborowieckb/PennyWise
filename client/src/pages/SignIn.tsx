import { Alert, Box, Button, Snackbar, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import signInPageImg from '../assets/signin-page-img.svg';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { AuthSliceInitialState, setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';

type Error = {
  status: number;
  data: unknown;
};

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const clearInputs = () => {
    setUsername('');
    setPassword('');
  };
  const clearError = () => setError(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = (await login({ username, password }).unwrap()) as AuthSliceInitialState;
      dispatch(setCredentials({ ...userData }));
      clearInputs();
      navigate('/');
    } catch (err) {
      const knownError = err as Error;
      if (!knownError?.status) {
        setError('No Server Response');
      } else if (knownError.status === 400) {
        setError('Missing Username or Password');
      } else if (knownError.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }
    }
  };

  useEffect(() => {
    clearError();
  }, [username, password]);

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Stack
        component={'form'}
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          p: 3,
          maxWidth: 300,
          gap: 2,
          border: '1px solid',
          position: 'relative',
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
        <img src={signInPageImg} alt="sign in illustration" style={{ height: 100 }} />
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
        <Button variant="contained" type="submit">
          Sign in
        </Button>
      </Stack>
    </Box>
  );
};

export default SignIn;

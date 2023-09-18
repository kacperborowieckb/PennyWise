import { Box, Button, Stack, TextField } from '@mui/material';
import { ChangeEvent, FormEvent, useState } from 'react';
import signInPageImg from '../assets/signin-page-img.svg';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { AuthSliceInitialState, setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = (await login({ username, password }).unwrap()) as AuthSliceInitialState;
      dispatch(setCredentials({ ...userData }));
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (err) {
      //   if (!err?.originalStatus) {
      //     // isLoading: true until timeout occurs
      //     setErrMsg('No Server Response');
      // } else if (err.originalStatus === 400) {
      //     setErrMsg('Missing Username or Password');
      // } else if (err.originalStatus === 401) {
      //     setErrMsg('Unauthorized');
      // } else {
      //     setErrMsg('Login Failed');
      // }
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
          maxWidth: 300,
          gap: 2,
          border: '1px solid',
          borderColor: (theme) => theme.palette.primary.main,
          borderRadius: 2,
        }}
      >
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

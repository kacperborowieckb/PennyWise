import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Link,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import signInPageImg from '../assets/signin-page-img.svg';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePersist } from '../hooks/usePersist';
import { ErrorType } from './SignUp';

const signInSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(16, 'Username must be below 16 characters'),
  password: z.string().min(6, 'Username must be at least 6 characters'),
});

type TSignInSchema = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignInSchema>({ resolver: zodResolver(signInSchema) });
  const [error, setError] = useState<string | null>(null);
  const [persist, setPersist] = usePersist();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePersistChange = () => setPersist((prev: boolean) => !prev);

  const onSubmit = async ({ username, password }: FieldValues) => {
    if (isLoading) return;
    try {
      const userData = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...userData }));
      reset();
      navigate('/');
    } catch (err) {
      const knownError = err as ErrorType;
      if (!knownError?.originalStatus) {
        setError('No Server Response');
      } else if (knownError.originalStatus === 400) {
        setError('Missing Username or Password');
      } else if (knownError.originalStatus === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }
    }
  };

  const clearError = () => setError('');

  return (
    <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
      <Stack
        component={'form'}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
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
        <img src={signInPageImg} alt="sign in illustration" style={{ height: 100 }} />
        <Typography
          sx={{ color: (theme) => theme.palette.primary.main }}
          component={'h2'}
          variant="h6"
          align="center"
        >
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          label="Username"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message?.toString()}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message?.toString()}
        />
        <FormControlLabel
          control={<Checkbox checked={persist} onChange={handlePersistChange} />}
          label="Trust this device?"
        />

        <Button variant="contained" type="submit" sx={{ height: '36px' }} disabled={isLoading}>
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Sign in'}
        </Button>
        <Typography component={'p'} variant="body1">
          Don't have an account yet?{' '}
          <Link href={'/signup'} sx={{ fontStyle: 'italic' }}>
            Sign up
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignIn;

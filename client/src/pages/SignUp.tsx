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
import { useState } from 'react';
import { useNavigate } from 'react-router';
import signUpPageImg from '../assets/signup-page-img.svg';
import { useRegisterMutation } from '../features/auth/authApiSlice';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(16, 'Username must be below 16 characters'),
    password: z.string().min(6, 'Username must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

type TSignUpSchema = z.infer<typeof signUpSchema>;

export type ErrorType = {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSignUpSchema>({ resolver: zodResolver(signUpSchema) });
  const [error, setError] = useState<string | null>(null);
  const [registerNewUser, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const clearError = () => setError(null);

  const onSubmit = async ({ username, password }: TSignUpSchema) => {
    if (isLoading) return;
    try {
      await registerNewUser({ username, password }).unwrap();
      reset();
      navigate('/signin');
    } catch (err) {
      const knownError = err as ErrorType;
      if (!knownError?.originalStatus) {
        setError('No Server Response');
      } else if (knownError.originalStatus === 400) {
        setError('Missing Username or Password');
      } else if (knownError.originalStatus === 409) {
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
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          p: 3,
          width: 320,
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
        <TextField
          variant="outlined"
          label="Confirm password"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message?.toString()}
        />
        <Button variant="contained" type="submit" sx={{ height: '36px' }} disabled={isLoading}>
          {isLoading ? <CircularProgress color="inherit" size={24} /> : 'Sign up'}
        </Button>
        <Typography component={'p'} variant="body1">
          Already have an account?
          <Link href={'/signin'} sx={{ fontStyle: 'italic', pl: 1 }}>
            Sign in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default SignUp;

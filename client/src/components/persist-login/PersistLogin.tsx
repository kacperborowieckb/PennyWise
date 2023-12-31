import { Navigate, Outlet, useLocation } from 'react-router';
import { useRefreshMutation } from '../../features/auth/authApiSlice';
import { usePersist } from '../../hooks/usePersist';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';

const PersistLogin = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [persist] = usePersist();
  const effectRan = useRef<boolean>(false);
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  const [refresh, { isLoading, isError, isSuccess, isUninitialized }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (!persist || (isSuccess && success) || (token && isUninitialized)) {
    return <Outlet />;
  } else if (isLoading) {
    return (
      <CircularProgress
        sx={{ position: 'absolute', top: '50%', left: '50%', translate: '-50% -50%' }}
      />
    );
  } else if (isError) {
    return <Navigate to={'/welcome'} state={{ from: location }} replace />;
  }

  return undefined;
};

export default PersistLogin;

import { Navigate, Outlet, useLocation } from 'react-router';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

const RequireAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  const location = useLocation();

  return token ? <Outlet /> : <Navigate to={'/welcome'} state={{ from: location }} replace />;
};

export default RequireAuth;

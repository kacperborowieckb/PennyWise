import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { transactionsApiSlice } from '../../features/transactions/transactionsApiSlice';
import { store } from '../../app/store';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const Prefetch = () => {
  const uid = useAppSelector(selectCurrentUserId);
  useEffect(() => {
    store.dispatch(transactionsApiSlice.util.prefetch('getTransactions', uid, { force: true }));
  }, []);

  return <Outlet />;
};

export default Prefetch;

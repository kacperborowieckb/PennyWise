import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { transactionsApiSlice } from '../../features/transactions/transactionsApiSlice';
import { store } from '../../app/store';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      transactionsApiSlice.util.prefetch('getTransactions', undefined, { force: true })
    );
  }, []);

  return <Outlet />;
};

export default Prefetch;

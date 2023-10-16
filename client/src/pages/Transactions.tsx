import { Box, CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
const TransactionTable = React.lazy(
  () => import('../components/transactions-table/TransactionTable')
);

const Transactions = () => {
  return (
    <Box sx={{ margin: '0 auto', maxWidth: '90%', height: '100%', my: 2 }}>
      <Suspense fallback={<CircularProgress />}>
        <TransactionTable />
      </Suspense>
    </Box>
  );
};

export default Transactions;

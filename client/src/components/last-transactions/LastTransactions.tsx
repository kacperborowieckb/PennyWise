import { Box, Paper, Stack, Typography } from '@mui/material';
import TransactionCard from '../transaction-card/TransactionCard';
import noTransactionsMade from '../../assets/no-transactions-made-img.svg';
import { useGetTransactionsQuery } from '../../features/transactions/transactionsApiSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const LastTransactions = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data, isLoading } = useGetTransactionsQuery(uid);

  return (
    <Paper
      sx={{
        height: '100%',
        p: 2,
      }}
      elevation={6}
    >
      <Typography component={'h3'} variant="h6" mb={1}>
        Last transactions:
      </Typography>
      <Stack
        direction={'row'}
        spacing={2}
        sx={{
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {!isLoading ? (
          data?.ids.slice(0, 6).map((id) => <TransactionCard id={id as string} key={id} />)
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} flex={1}>
            <img src={noTransactionsMade} alt="No planned transactions" height={100} />
            <Typography component={'h3'} variant="h6" align="center">
              No transactions made.
            </Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default LastTransactions;

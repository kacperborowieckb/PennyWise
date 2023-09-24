import { Box, Paper, Stack, Typography } from '@mui/material';
import { mockTransactions } from '../../helpers/mockTransactions';
import TransactionCard from '../transaction-card/TransactionCard';
import noTransactionsMade from '../../assets/no-transactions-made-img.svg';

const LastTransactions = () => {
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
        {mockTransactions.length > 0 ? (
          mockTransactions.map((transaction, i) => (
            <TransactionCard value={transaction.value} category={transaction.category} key={i} />
          ))
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

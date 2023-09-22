import { Paper, Stack, Typography } from '@mui/material';
import { mockTransactions } from '../../helpers/mockTransactions';
import TransactionCard from '../transaction-card/TransactionCard';

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
        sx={{ overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {mockTransactions.map((transaction, i) => (
          <TransactionCard value={transaction.value} category={transaction.category} key={i} />
        ))}
      </Stack>
    </Paper>
  );
};

export default LastTransactions;

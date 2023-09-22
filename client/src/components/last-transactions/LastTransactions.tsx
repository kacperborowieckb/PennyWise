import { Card, CardContent, Paper, Stack, Typography } from '@mui/material';
import { mockTransactions } from '../../helpers/mockTransactions';
import { categoriesProperties } from '../../helpers/categoriesProperties';

const LastTransactions = () => {
  return (
    <Paper
      sx={{
        height: '100%',
        p: 2,
        overflowX: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
      elevation={6}
    >
      <Stack direction={'row'} height={'100%'} spacing={2}>
        {mockTransactions.map((transaction, i) => (
          <Card variant="outlined" sx={{ minWidth: 180, cursor: 'pointer' }} key={i}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography
                align="center"
                component={'h6'}
                variant="h5"
                sx={{
                  px: 1,
                  width: '100%',
                  borderRadius: 1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                bgcolor={
                  transaction.value > 0
                    ? (theme) => theme.palette.success.main
                    : (theme) => theme.palette.error.main
                }
              >
                {transaction.value + ' $'}
              </Typography>
              <Typography align="center" component={'h6'} variant="h6">
                Category:
              </Typography>
              {categoriesProperties[transaction.category].icon}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Paper>
  );
};

export default LastTransactions;

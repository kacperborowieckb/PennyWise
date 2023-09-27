import { Box, Grid, Paper, Typography } from '@mui/material';
import ExpensesChart from '../expenses-chart/ExpensesChart';
import MonthlyRatioChart from '../monthly-ratio-chart/MonthlyRatioChart';
import Balance from '../balance/Balance';

const Budget = () => {
  return (
    <Paper sx={{ height: '100%', p: 2 }} elevation={6}>
      <Grid container spacing={2} height={'100%'}>
        <Grid item xs={12} md={7} container>
          <Grid item xs={12}>
            <Balance />
          </Grid>
          <Grid item xs={12}>
            <MonthlyRatioChart />
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography component={'h2'} variant="h5">
            Expenses
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              gap: 2,
            }}
          >
            <ExpensesChart />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Budget;

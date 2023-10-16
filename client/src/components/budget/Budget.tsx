import { Box, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import Balance from '../balance/Balance';
import React, { Suspense } from 'react';
const MonthlyRatioChart = React.lazy(() => import('../monthly-ratio-chart/MonthlyRatioChart'));
const ExpensesChart = React.lazy(() => import('../expenses-chart/ExpensesChart'));

const Budget = () => {
  return (
    <Paper sx={{ height: '100%', p: 2 }} elevation={6}>
      <Grid container spacing={2} height={'100%'}>
        <Grid item xs={12} md={7} container>
          <Grid item xs={12}>
            <Balance />
          </Grid>
          <Grid item xs={12}>
            <Suspense fallback={<CircularProgress />}>
              <MonthlyRatioChart />
            </Suspense>
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
            <Suspense fallback={<CircularProgress />}>
              <ExpensesChart />
            </Suspense>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Budget;

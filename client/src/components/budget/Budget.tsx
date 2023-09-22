import { Divider, Grid, Paper, Typography } from '@mui/material';
import ExpensesChart from '../expenses-chart/ExpensesChart';
import MonthlyRatioChart from '../monthly-ratio-chart/MonthlyRatioChart';

const Budget = () => {
  return (
    <Paper sx={{ height: '100%', p: 2 }} elevation={6}>
      <Grid container spacing={2} height={'100%'} p={2}>
        <Grid item xs={12} md={7} container>
          <Grid item xs={12}>
            <Typography component={'h1'} variant="h4">
              4523.57$
            </Typography>
            <Typography component={'p'} variant="h6">
              Total
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <MonthlyRatioChart />
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography component={'h2'} variant="h5">
            Expenses
          </Typography>
          <ExpensesChart />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Budget;

import { Box, Grid, Paper, Tooltip, Typography } from '@mui/material';
import ExpensesChart from '../expenses-chart/ExpensesChart';
import MonthlyRatioChart from '../monthly-ratio-chart/MonthlyRatioChart';
import { Info } from '@mui/icons-material';

const Budget = () => {
  return (
    <Paper sx={{ height: '100%', p: 2 }} elevation={6}>
      <Grid container spacing={2} height={'100%'}>
        <Grid item xs={12} md={7} container>
          <Grid item xs={12}>
            <Typography component={'h1'} variant="h4" sx={{ position: 'relative' }}>
              4523.57 $
              <Tooltip
                title="You can change currency in settings"
                sx={{ position: 'absolute', ml: '3px' }}
                enterTouchDelay={0}
              >
                <Info fontSize="small" />
              </Tooltip>
            </Typography>
            <Typography component={'p'} variant="h6">
              Balance
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

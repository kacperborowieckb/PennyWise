import { Grid } from '@mui/material';
import LastTransactions from '../components/last-transactions/LastTransactions';
import OverviewSideBar from '../components/overview-side-bar/OverviewSideBar';
import Budget from '../components/budget/Budget';

const Overview = () => {
  return (
    <Grid container spacing={2} p={2} height={'100%'}>
      <Grid item xs={12} sm={7} md={8} container>
        <Grid item xs={12} height={'75%'}>
          <Budget />
        </Grid>
        <Grid item xs={12} sx={{ mt: '14px' }} height={'calc(25% - 14px)'}>
          <LastTransactions />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={5} md={4}>
        <OverviewSideBar />
      </Grid>
    </Grid>
  );
};

export default Overview;

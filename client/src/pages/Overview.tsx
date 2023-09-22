import { Grid } from '@mui/material';
import LastTransactions from '../components/last-transactions/LastTransactions';
import OverviewSideBar from '../components/overview-side-bar/OverviewSideBar';
import Budget from '../components/budget/Budget';

const Overview = () => {
  return (
    <Grid container spacing={2} p={2} flex={1}>
      <Grid item xs={12} sm={7} md={8} container>
        <Grid item xs={12} height={'calc(100% - 180px - 14px)'}>
          <Budget />
        </Grid>
        <Grid item xs={12} sx={{ mt: '14px' }} maxHeight={180}>
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

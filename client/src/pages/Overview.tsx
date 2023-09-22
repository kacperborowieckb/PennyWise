import { Grid } from '@mui/material';
import LastTransactions from '../components/last-transactions/LastTransactions';
import OverviewSideBar from '../components/overview-side-bar/OverviewSideBar';
import Budget from '../components/budget/Budget';

const Overview = () => {
  return (
    <Grid container spacing={2} height={'100%'} p={2} direction={{}}>
      <Grid item xs={8} container>
        <Grid item xs={12}>
          <Budget />
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
          <LastTransactions />
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <OverviewSideBar />
      </Grid>
    </Grid>
  );
};

export default Overview;

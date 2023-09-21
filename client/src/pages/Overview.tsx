import { Grid } from '@mui/material';
import LastTransactions from '../components/last-transactions/LastTransactions';
import OverviewSideBar from '../components/overview-side-bar/OverviewSideBar';
import Budget from '../components/budget/Budget';

const Overview = () => {
  return (
    <Grid container spacing={2} height={'100%'} p={2}>
      <Grid item xs={8} container spacing={2} direction={'column'}>
        <Grid item xs={8}>
          <Budget />
        </Grid>
        <Grid item xs={4}>
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

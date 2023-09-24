import { Paper, Stack } from '@mui/material';
import PlannedPayments from '../planned-payments/PlannedPayments';
import Calendar from '../calendar/Calendar';

const OverviewSideBar = () => {
  return (
    <Paper elevation={6} sx={{ height: '100%', p: 2 }}>
      <Stack height={'100%'} spacing={2}>
        <PlannedPayments />
        <Calendar />
      </Stack>
    </Paper>
  );
};

export default OverviewSideBar;

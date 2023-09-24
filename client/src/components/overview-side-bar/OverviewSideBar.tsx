import { Paper } from '@mui/material';
import PlannedPayments from '../planned-payments/PlannedPayments';
import Calendar from '../calendar/Calendar';

const OverviewSideBar = () => {
  return (
    <Paper
      elevation={6}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', p: 2 }}
    >
      <PlannedPayments />
      <Calendar />
    </Paper>
  );
};

export default OverviewSideBar;

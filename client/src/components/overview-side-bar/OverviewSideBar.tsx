import { Paper, Stack, Typography } from '@mui/material';
import PlannedPayments from '../planned-payments/PlannedPayments';
import Calendar from '../calendar/Calendar';

const OverviewSideBar = () => {
  return (
    <Paper elevation={6} sx={{ height: '100%', p: 2 }}>
      <Stack height={'100%'}>
        <Typography component={'h3'} variant="h6">
          Planned payments:
        </Typography>
        <PlannedPayments />
        <Calendar />
      </Stack>
    </Paper>
  );
};

export default OverviewSideBar;

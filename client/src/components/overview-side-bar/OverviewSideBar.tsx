import { Paper } from '@mui/material';
import PlannedPayments from '../planned-payments/PlannedPayments';
import Calendar from '../calendar/Calendar';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const OverviewSideBar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  return (
    <Paper
      elevation={6}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', p: 2 }}
    >
      <PlannedPayments selectedDate={selectedDate} />
      <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </Paper>
  );
};

export default OverviewSideBar;

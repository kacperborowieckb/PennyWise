import { Button, Stack } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar value={selectedDate} onChange={(newDate) => setSelectedDate(newDate)} />
      </LocalizationProvider>

      <Button variant="contained" sx={{ margin: '0 auto' }}>
        Plan a payment
      </Button>
    </Stack>
  );
};

export default Calendar;

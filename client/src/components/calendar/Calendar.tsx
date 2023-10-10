import { Button, Stack } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import PlanAPaymentDialog from '../plan-a-payment-dialog/PlanAPaymentDialog';
import { useToogle } from '../../hooks/useToogle';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [isPlanAPaymentOpen, tooglePlanAPayment] = useToogle(false);

  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          sx={{ maxWidth: '100%' }}
        />
      </LocalizationProvider>
      <Button variant="contained" sx={{ margin: '0 auto' }} onClick={tooglePlanAPayment}>
        Plan a payment
      </Button>
      {isPlanAPaymentOpen && (
        <PlanAPaymentDialog isOpen={isPlanAPaymentOpen} toogle={tooglePlanAPayment} />
      )}
    </Stack>
  );
};

export default Calendar;

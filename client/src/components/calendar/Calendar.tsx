import { Button, Stack } from '@mui/material';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import PlanAPaymentDialog from '../plan-a-payment-dialog/PlanAPaymentDialog';
import { usetoggle } from '../../hooks/usetoggle';

type CalendarProps = {
  selectedDate: Dayjs | null;
  setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
};

const Calendar = ({ selectedDate, setSelectedDate }: CalendarProps) => {
  const [isPlanAPaymentOpen, togglePlanAPayment] = usetoggle(false);

  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          sx={{ maxWidth: '100%' }}
        />
      </LocalizationProvider>
      <Button variant="contained" sx={{ margin: '0 auto' }} onClick={togglePlanAPayment}>
        Plan a payment
      </Button>
      {isPlanAPaymentOpen && (
        <PlanAPaymentDialog isOpen={isPlanAPaymentOpen} toggle={togglePlanAPayment} />
      )}
    </Stack>
  );
};

export default Calendar;

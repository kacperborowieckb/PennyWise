import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

const DateInput = ({ defaultValue }: { defaultValue: string }) => {
  const [date, setDate] = useState<string>(defaultValue);

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      const formatedDate = date.format('YYYY-MM-DD');
      setDate(formatedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        sx={{ m: 1 }}
        label="Pick a date"
        value={dayjs(date)}
        onChange={(val) => handleDateChange(val)}
      />
    </LocalizationProvider>
  );
};

export default DateInput;

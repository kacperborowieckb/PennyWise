import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Control, Controller } from 'react-hook-form';

type DateInputProps = {
  control: Control<any>;
};

const DateInput = ({ control }: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="plannedFor"
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            sx={{ m: 1 }}
            label="Pick a date"
            value={value || dayjs()}
            onChange={onChange}
          />
        )}
      ></Controller>
    </LocalizationProvider>
  );
};

export default DateInput;

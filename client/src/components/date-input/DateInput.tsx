import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { Control, Controller } from 'react-hook-form';

type DateInputProps = {
  control: Control<any>;
  selectedDate?: Dayjs | null;
};

const DateInput = ({ control, selectedDate }: DateInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name="plannedFor"
        control={control}
        defaultValue={selectedDate || dayjs()}
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

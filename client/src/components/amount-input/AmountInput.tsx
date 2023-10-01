import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type AmountInputProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

const AmountInput = ({ register, errors }: AmountInputProps) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: 220 }}>
      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
        label="Amount"
        {...register('amount')}
        error={!!errors.amount}
        autoComplete="off"
        type="number"
      />
      <FormHelperText error={!!errors.amount}>{errors.amount?.message?.toString()}</FormHelperText>
    </FormControl>
  );
};

export default AmountInput;
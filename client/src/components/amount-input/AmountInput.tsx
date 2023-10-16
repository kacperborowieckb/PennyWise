import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { InputProps } from '../../types/inputProps';

const AmountInput = ({ register, errors }: InputProps) => {
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
        inputProps={{
          step: '0.01',
        }}
      />
      <FormHelperText error={!!errors.amount}>{errors.amount?.message?.toString()}</FormHelperText>
    </FormControl>
  );
};

export default AmountInput;

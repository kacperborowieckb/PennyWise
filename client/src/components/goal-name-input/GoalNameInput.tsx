import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { InputProps } from '../../types/inputProps';

const GoalNameInput = ({ register, errors }: InputProps) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: 220 }}>
      <InputLabel htmlFor="outlined-adornment-name">Goal name</InputLabel>
      <OutlinedInput
        id="outlined-adornment-name"
        label="Goal name"
        {...register('name')}
        error={!!errors.name}
        autoComplete="off"
        type="string"
      />
      <FormHelperText error={!!errors.name}>{errors.name?.message?.toString()}</FormHelperText>
    </FormControl>
  );
};

export default GoalNameInput;

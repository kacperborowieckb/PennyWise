import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { InputProps } from '../../types/inputProps';

type GoalInputProps = InputProps & {
  control: Control<any>;
  goals: string[];
};

const GoalInput = ({ errors, control, goals }: GoalInputProps) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="goal-input-required-label">Select Goal</InputLabel>
      <Controller
        name="goal"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            labelId="goal-input-required-label"
            id="goal-input-required"
            label="Select Goal"
            value={value || ''}
            onChange={onChange}
            error={!!errors.goal}
          >
            {goals.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal}
              </MenuItem>
            ))}
          </Select>
        )}
      ></Controller>

      <FormHelperText error={!!errors.goal}>{errors?.goal?.message?.toString()}</FormHelperText>
    </FormControl>
  );
};

export default GoalInput;

import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Categories } from '../../helpers/categories';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';

type AmountInputProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  control: Control<any>;
};

const CategoryInput = ({ errors, control }: AmountInputProps) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="category-input-required-label">Category</InputLabel>
      <Controller
        name="category"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            labelId="category-input-required-label"
            id="category-input-required"
            label="Category"
            value={value || ''}
            onChange={onChange}
            error={!!errors.category}
          >
            {Object.values(Categories)
              .filter((category) => category !== Categories.income)
              .map((category) => (
                <MenuItem key={category} value={category}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {categoriesProperties[category.toLowerCase()].icon}
                    {category}
                  </Box>
                </MenuItem>
              ))}
          </Select>
        )}
      ></Controller>

      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
};

export default CategoryInput;

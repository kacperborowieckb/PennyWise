import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Categories } from '../../helpers/categories';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type AmountInputProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

const CategoryInput = ({ register, errors }: AmountInputProps) => {
  return (
    <FormControl required sx={{ m: 1, minWidth: 220 }}>
      <InputLabel id="category-input-required-label">Category</InputLabel>
      <Select
        labelId="category-input-required-label"
        id="category-input-required"
        label="Category"
        {...register('category')}
        error={!!errors.category}
      >
        {Object.values(Categories)
          .filter((category) => category !== Categories.income)
          .map((category) => (
            <MenuItem key={category} value={category}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {categoriesProperties[category].icon}
                {category}
              </Box>
            </MenuItem>
          ))}
      </Select>
      <FormHelperText>Required</FormHelperText>
    </FormControl>
  );
};

export default CategoryInput;

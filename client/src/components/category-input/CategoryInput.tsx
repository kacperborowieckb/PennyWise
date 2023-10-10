import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Categories } from '../../helpers/categories';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import { Control, Controller } from 'react-hook-form';
import { InputProps } from '../../types/inputProps';

type CategoryInputProps = InputProps & {
  control: Control<any>;
};

const CategoryInput = ({ errors, control }: CategoryInputProps) => {
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

      <FormHelperText error={!!errors.category}>
        {errors?.category?.message?.toString()}
      </FormHelperText>
    </FormControl>
  );
};

export default CategoryInput;

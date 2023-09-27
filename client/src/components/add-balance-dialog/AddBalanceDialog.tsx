import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useAddBalanceMutation } from '../../features/auth/balanceApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const addBalanceSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
});

type TAddBalanceSchema = z.infer<typeof addBalanceSchema>;

const AddBalanceDialog = ({ isOpen, toogle }: { isOpen: boolean; toogle: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    formState: { errors },
  } = useForm<TAddBalanceSchema>({ resolver: zodResolver(addBalanceSchema) });
  const [addBalance] = useAddBalanceMutation();
  const uid = useSelector(selectCurrentUserId);
  console.log(getValues());
  const handleAddBalance = async ({ amount }: FieldValues) => {
    try {
      await addBalance({ uid, amount }).unwrap();
      reset();
      toogle();
    } catch (err) {
      setError('root.serverError', {
        message: 'Some unkown error happend.',
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toogle}
      component={'form'}
      onSubmit={handleSubmit(handleAddBalance)}
    >
      <DialogTitle>Add balance</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }} error={!!errors.amount}>
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
          <FormHelperText error={!!errors.amount}>
            {errors.amount?.message?.toString()}
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toogle}>Cancel</Button>
        <Button variant="contained" type="submit">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBalanceDialog;

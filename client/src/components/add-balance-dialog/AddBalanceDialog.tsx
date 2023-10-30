import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAddBalanceMutation } from '../../features/balance/balanceApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AmountInput from '../amount-input/AmountInput';
import { DialogProps } from '../../types/DialogProps';
import { toast } from 'sonner';

const addBalanceSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
});

export type TAddBalanceSchema = z.infer<typeof addBalanceSchema>;

const AddBalanceDialog = ({ isOpen, toggle }: DialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TAddBalanceSchema>({ resolver: zodResolver(addBalanceSchema) });
  const [addBalance, { isLoading }] = useAddBalanceMutation();
  const uid = useSelector(selectCurrentUserId);

  const handleAddBalance = async ({ amount }: TAddBalanceSchema) => {
    if (isLoading) return;
    try {
      await addBalance({ uid, amount }).unwrap();
      reset();
      toggle();
      toast.success(`Added $${amount} to balance`);
    } catch (err) {
      toast.error('Failed to add balance');
      setError('root.serverError', {
        message: 'Some unknown error happened.',
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      component={'form'}
      onSubmit={handleSubmit(handleAddBalance)}
    >
      <DialogTitle>Add balance</DialogTitle>
      <DialogContent>
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toggle}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? <CircularProgress color="inherit" size={25} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBalanceDialog;

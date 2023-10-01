import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAddBalanceMutation } from '../../features/auth/balanceApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AmountInput from '../amount-input/AmountInput';

const addBalanceSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
});

export type TAddBalanceSchema = z.infer<typeof addBalanceSchema>;

const AddBalanceDialog = ({ isOpen, toogle }: { isOpen: boolean; toogle: () => void }) => {
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
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toogle}>Cancel</Button>
        <Button variant="contained" type="submit">
          {isLoading ? <CircularProgress color="inherit" size={25} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBalanceDialog;

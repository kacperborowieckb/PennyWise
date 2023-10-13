import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AmountInput from '../amount-input/AmountInput';
import { zodResolver } from '@hookform/resolvers/zod';
import CategoryInput from '../category-input/CategoryInput';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { DialogProps } from '../../types/DialogProps';
import GoalInput from '../goal-input/GoalInput';

const transferToGoalSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
  goal: z.string(),
});

type TTransferToGoalSchema = z.infer<typeof transferToGoalSchema>;

const TransferToGoalDialog = ({ isOpen, toggle }: DialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<TTransferToGoalSchema>({ resolver: zodResolver(transferToGoalSchema) });
  const uid = useSelector(selectCurrentUserId);
  // const [addExpense, { isLoading }] = useAddExpenseMutation();

  const handleTransferToGoal = async ({ amount, goal }: TTransferToGoalSchema) => {
    try {
      // await addExpense({ uid, amount, category }).unwrap();
      reset();
      toggle();
    } catch (err) {
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
      onSubmit={handleSubmit(handleTransferToGoal)}
    >
      <DialogTitle>Transfer to goal</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <GoalInput register={register} errors={errors} control={control} goals={[]} />
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toggle}>Cancel</Button>
        <Button type="submit" variant="contained">
          {false ? <CircularProgress color="inherit" size={25} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TransferToGoalDialog;

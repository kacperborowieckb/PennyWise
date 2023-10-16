import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AmountInput from '../amount-input/AmountInput';
import { DialogProps } from '../../types/DialogProps';
import {
  Goals,
  useGetGoalsQuery,
  useWithDrawFromGoalMutation,
} from '../../features/goals/goalsApiSlice';
import GoalInput from '../goal-input/GoalInput';
import { toast } from 'sonner';

const withdrawSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
  goal: z.string(),
});

export type TWithdrawSchema = z.infer<typeof withdrawSchema>;

const WithdrawDialog = ({ isOpen, toggle, goal }: DialogProps & { goal?: Goals }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<TWithdrawSchema>({ resolver: zodResolver(withdrawSchema) });
  const [withdrawMoney, { isLoading }] = useWithDrawFromGoalMutation();
  const uid = useSelector(selectCurrentUserId);
  const { goals } = useGetGoalsQuery(uid, {
    selectFromResult: ({ data }) => ({ goals: data?.ids }),
  });

  const handleAddBalance = async ({ amount }: TWithdrawSchema) => {
    try {
      if (goal) {
        if (amount > goal?.amount) {
          setError('goal', { message: "Don't have enough cash in this goal" });
          throw new Error('Value Error');
        }
        await withdrawMoney({ uid, amount, name: goal?.name }).unwrap();
        reset();
        toggle();
        toast.success(`Withdrew $${amount} from ${goal.name}`);
      }
    } catch (err) {
      if (err instanceof Error && err.message !== 'Value Error') {
        toast.error(`Failed to withdrew`);
        setError('root.serverError', {
          message: 'Some unknown error happened.',
        });
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      component={'form'}
      onSubmit={handleSubmit(handleAddBalance)}
    >
      <DialogTitle>Withdraw from {goal?.name}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <GoalInput
          register={register}
          errors={errors}
          control={control}
          goals={goals as string[]}
          goal={goal?.name}
        />
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toggle}>Cancel</Button>
        <Button variant="contained" type="submit">
          {isLoading ? <CircularProgress color="inherit" size={25} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WithdrawDialog;

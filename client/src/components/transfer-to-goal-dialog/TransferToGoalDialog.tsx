import {
  Backdrop,
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
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { DialogProps } from '../../types/DialogProps';
import GoalInput from '../goal-input/GoalInput';
import { useGetGoalsQuery, useTransferToGoalMutation } from '../../features/goals/goalsApiSlice';
import { toast } from 'sonner';
import { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

const transferToGoalSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
  goal: z.string(),
});

type TTransferToGoalSchema = z.infer<typeof transferToGoalSchema>;

const TransferToGoalDialog = ({ isOpen, toggle, goal }: DialogProps & { goal?: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<TTransferToGoalSchema>({ resolver: zodResolver(transferToGoalSchema) });
  const uid = useSelector(selectCurrentUserId);
  const { goals } = useGetGoalsQuery(uid, {
    selectFromResult: ({ data }) => ({ goals: data?.ids }),
  });
  const [transferToGoal, { isLoading }] = useTransferToGoalMutation();
  const [isExploding, setIsExploding] = useState<boolean>(false);

  const handleFinishExplosion = () => setIsExploding(false);

  const handleTransferToGoal = async ({ amount, goal }: TTransferToGoalSchema) => {
    if (isLoading) return;
    try {
      const { isFinished } = await transferToGoal({ uid, amount, name: goal }).unwrap();
      reset();
      toggle();
      if (isFinished) {
        setIsExploding(true);
        toast.success(`${goal} finished! `);
      } else {
        toast.success(`$${amount} transferred to ${goal}`);
      }
    } catch (err) {
      toast.error('Failed to transfer');
      setError('root.serverError', {
        message: 'Some unknown error happened.',
      });
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={toggle}
        component={'form'}
        onSubmit={handleSubmit(handleTransferToGoal)}
      >
        <DialogTitle>Transfer to goal</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <GoalInput
            register={register}
            errors={errors}
            control={control}
            goals={goals as string[]}
            goal={goal}
          />
          <AmountInput register={register} errors={errors} />
        </DialogContent>
        <DialogActions sx={{ m: '0 auto' }}>
          <Button onClick={toggle}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? <CircularProgress color="inherit" size={25} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop open={isExploding} invisible sx={{ zIndex: -1 }}>
        {isExploding && <ConfettiExplosion onComplete={handleFinishExplosion} duration={3000} />}
      </Backdrop>
    </>
  );
};

export default TransferToGoalDialog;

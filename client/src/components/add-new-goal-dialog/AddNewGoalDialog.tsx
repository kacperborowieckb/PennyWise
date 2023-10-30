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
import { useAddNewGoalMutation } from '../../features/goals/goalsApiSlice';
import GoalNameInput from '../goal-name-input/GoalNameInput';
import { toast } from 'sonner';
import { ErrorType } from '../../pages/SignUp';

const addNewGoalSchema = z.object({
  amount: z.coerce.number().multipleOf(0.01).min(0.01, 'Minimum is 0.01'),
  name: z.string().min(2, 'Minimum length of name is 2').max(16, 'Maximum length of name is 16'),
});

export type TAddNewGoalSchema = z.infer<typeof addNewGoalSchema>;

const AddNewGoalDialog = ({ isOpen, toggle }: DialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<TAddNewGoalSchema>({ resolver: zodResolver(addNewGoalSchema) });
  const [addNewGoal, { isLoading }] = useAddNewGoalMutation();
  const uid = useSelector(selectCurrentUserId);

  const handleAddNewGoal = async ({ amount, name }: TAddNewGoalSchema) => {
    if (isLoading) return;
    try {
      await addNewGoal({ uid, goal: amount, name }).unwrap();
      reset();
      toggle();
      toast.success(`${name} has been created!`);
    } catch (err) {
      const error = err as ErrorType;
      if (error.originalStatus !== 409) {
        toast.error('Failed to create a goal.');
        setError('root.serverError', {
          message: 'Some unknown error happened.',
        });
      }
      toast.error(`Already have '${name}' goal`);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={toggle}
      component={'form'}
      onSubmit={handleSubmit(handleAddNewGoal)}
    >
      <DialogTitle>Add new goal</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <GoalNameInput register={register} errors={errors} />
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

export default AddNewGoalDialog;

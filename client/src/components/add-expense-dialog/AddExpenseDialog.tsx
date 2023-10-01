import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Categories } from '../../helpers/categories';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AmountInput from '../amount-input/AmountInput';
import { zodResolver } from '@hookform/resolvers/zod';
import CategoryInput from '../category-input/CategoryInput';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useAddExpenseMutation } from '../../features/auth/expenseApiSlice';

const addExpenseSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
  category: z.nativeEnum(Categories),
});

type TAddExpenseSchema = z.infer<typeof addExpenseSchema>;

const AddExpenseDialog = ({ isOpen, toogle }: { isOpen: boolean; toogle: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    getValues,
    control,
    formState: { errors },
  } = useForm<TAddExpenseSchema>({ resolver: zodResolver(addExpenseSchema) });
  const uid = useSelector(selectCurrentUserId);
  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const handleAddExpense = async ({ amount, category }: TAddExpenseSchema) => {
    try {
      await addExpense({ uid, amount, category }).unwrap();
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
      onSubmit={handleSubmit(handleAddExpense)}
    >
      <DialogTitle>Add expense</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <CategoryInput register={register} errors={errors} control={control} />
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toogle}>Cancel</Button>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;

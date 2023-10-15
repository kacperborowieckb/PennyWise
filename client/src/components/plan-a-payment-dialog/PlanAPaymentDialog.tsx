import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { DialogProps } from '../../types/DialogProps';
import CategoryInput from '../category-input/CategoryInput';
import AmountInput from '../amount-input/AmountInput';
import { z } from 'zod';
import { Categories } from '../../helpers/categories';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DateInput from '../date-input/DateInput';
import { useAddPlannedTransactionMutation } from '../../features/planned-transactions/plannedTransactionsSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import dayjs, { Dayjs } from 'dayjs';

type PlanAPaymentDialogProps = DialogProps & {
  selectedDate?: Dayjs | null;
};

const addExpenseSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
  category: z.nativeEnum(Categories),
  plannedFor: z.custom((val) => dayjs(val as Dayjs).isValid()),
});

type TPlanAPaymentSchema = z.infer<typeof addExpenseSchema>;

const PlanAPaymentDialog = ({ isOpen, toggle, selectedDate }: PlanAPaymentDialogProps) => {
  const uid = useAppSelector(selectCurrentUserId);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<TPlanAPaymentSchema>({ resolver: zodResolver(addExpenseSchema) });
  const [addTransaction, { isLoading }] = useAddPlannedTransactionMutation();

  const handlePlanATransaction = async ({ amount, category, plannedFor }: TPlanAPaymentSchema) => {
    try {
      await addTransaction({
        amount,
        category,
        plannedFor: dayjs(plannedFor).format('YYYY-MM-DD'),
        uid,
      }).unwrap();
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
      onSubmit={handleSubmit(handlePlanATransaction)}
    >
      <DialogTitle>Plan a payment</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <DateInput control={control} selectedDate={selectedDate} />
        <CategoryInput register={register} errors={errors} control={control} />
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toggle}>Cancel</Button>
        <Button type="submit" variant="contained">
          {isLoading ? <CircularProgress color="inherit" size={25} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanAPaymentDialog;

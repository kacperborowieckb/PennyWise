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
import dayjs from 'dayjs';

type PlanAPaymentDialogProps = DialogProps & {
  date?: any;
};

const addExpenseSchema = z.object({
  amount: z.coerce.number().min(0.01, 'Minimum is 0.01'),
  category: z.nativeEnum(Categories),
});

type TAddExpenseSchema = z.infer<typeof addExpenseSchema>;

const PlanAPaymentDialog = ({
  isOpen,
  toogle,
  date = dayjs().format('YYYY-MM-DD'),
}: PlanAPaymentDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    formState: { errors },
  } = useForm<TAddExpenseSchema>({ resolver: zodResolver(addExpenseSchema) });
  const isLoading = false;
  const handlePlanAPayment = async () => {
    try {
      // await action
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
      onSubmit={handleSubmit(handlePlanAPayment)}
    >
      <DialogTitle>Plan a payment</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <DateInput defaultValue={date} />
        <CategoryInput register={register} errors={errors} control={control} />
        <AmountInput register={register} errors={errors} />
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toogle}>Cancel</Button>
        <Button type="submit" variant="contained">
          {isLoading ? <CircularProgress color="inherit" size={25} /> : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlanAPaymentDialog;

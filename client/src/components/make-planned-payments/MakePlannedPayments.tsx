import { Button, CircularProgress } from '@mui/material';
import { EntityId } from '@reduxjs/toolkit';
import {
  PlannedTransaction,
  useDeletePlannedTransactionsMutation,
} from '../../features/planned-transactions/plannedTransactionsSlice';
import { useAddExpenseMutation } from '../../features/expenses/expensesApiSlice';
import { toast } from 'sonner';

type MakePlannedPaymentsButtonProps = {
  uid: string;
  selected: string[];
  data: {
    ids: EntityId[];
    entities: {
      [x: string]: PlannedTransaction;
      [x: number]: PlannedTransaction;
    };
  };
  resetInputs: () => void;
};

const MakePlannedPayments = ({
  uid,
  selected,
  data,
  resetInputs,
}: MakePlannedPaymentsButtonProps) => {
  const [addExpense, { isLoading }] = useAddExpenseMutation();
  const [deletePlannedTransaction] = useDeletePlannedTransactionsMutation();

  const makePlannedPayments = async () => {
    if (isLoading) return;
    const payments: Promise<void>[] = [];
    selected.forEach((id) =>
      payments.push(
        addExpense({
          uid,
          amount: data.entities[id].amount,
          category: data.entities[id].category,
        }).unwrap()
      )
    );
    try {
      await Promise.all(payments);
      await deletePlannedTransaction({ uid, ids: selected });
      toast.success(`${payments.length} planned payments made`);
    } catch (error) {
      toast.error('Failed to make planned payments');
      console.error(error);
    }
    resetInputs();
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Button variant="contained" onClick={makePlannedPayments}>
          Make
        </Button>
      )}
    </>
  );
};

export default MakePlannedPayments;

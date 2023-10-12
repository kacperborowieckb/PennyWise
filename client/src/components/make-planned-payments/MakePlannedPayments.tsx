import { Button, CircularProgress } from '@mui/material';
import { EntityId } from '@reduxjs/toolkit';
import { PlannedTransaction } from '../../features/planned-transactions/plannedTransactionsSlice';
import { useAddExpenseMutation } from '../../features/expenses/expensesApiSlice';

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

  const makePlannedPayments = async () => {
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
    await Promise.all(payments);
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
      ;
    </>
  );
};

export default MakePlannedPayments;

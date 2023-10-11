import dayjs, { Dayjs } from 'dayjs';
import { PlannedTransaction } from '../features/planned-transactions/plannedTransactionsSlice';
import { EntityId, EntityState } from '@reduxjs/toolkit';

type FilterTransactionProps = {
  data: EntityState<PlannedTransaction> | undefined;
  selectedDate: Dayjs | null;
};

export const filterTransactionsForCurrentDate = ({
  data,
  selectedDate,
}: FilterTransactionProps) => {
  const transactionForSelectedDate = data?.ids?.filter(
    (id) => data.entities[id]?.plannedFor === dayjs(selectedDate).format('YYYY-MM-DD')
  );
  const entities: Record<EntityId, PlannedTransaction> = {};
  transactionForSelectedDate?.map((id) => {
    entities[id] = { ...(data?.entities[id] as PlannedTransaction) };
  });

  return {
    data: {
      ids: transactionForSelectedDate as EntityId[],
      entities: { ...entities },
    },
  };
};

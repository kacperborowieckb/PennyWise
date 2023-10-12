import { EntityState } from '@reduxjs/toolkit';
import { Transaction } from '../features/transactions/transactionsApiSlice';
import dayjs from 'dayjs';
import { Categories } from '../helpers/categories';
import { Months } from '../helpers/months';

type DataSetType = {
  income: number;
  expenses: number;
  month: string;
};

const getLatestMonths = (): number[] => {
  const currentDate = new Date();
  const latestMonths: number[] = [];

  for (let i = 0; i < 4; i++) {
    let month = currentDate.getMonth() - i;
    let year = currentDate.getFullYear();

    if (month < 0) {
      month = 12;
      year -= 1;
    }
    latestMonths.push(month + 1);
  }
  return latestMonths;
};

export const getMonthlyRatioDataSet = (
  data: EntityState<Transaction> | undefined
): DataSetType[] => {
  const latestMonths = getLatestMonths();

  const transactionsInLatestMonths = data?.ids.filter(
    (id) => latestMonths.indexOf(dayjs(data.entities[id]?.createdAt).month() + 1) !== -1
  );
  const dataset: DataSetType[] = [];

  latestMonths.forEach((month) => {
    const transactionInThisMonth = transactionsInLatestMonths?.filter(
      (id) => dayjs(data?.entities[id]?.createdAt).month() + 1 === month
    );
    dataset.push({
      income: transactionInThisMonth
        ?.filter((id) => data?.entities[id]?.category === Categories.income)
        .reduce((acc: number, id) => acc + (data?.entities[id]?.amount as number), 0) as number,
      expenses: transactionInThisMonth
        ?.filter((id) => data?.entities[id]?.category !== Categories.income)
        .reduce((acc: number, id) => acc + (data?.entities[id]?.amount as number), 0) as number,
      month: Months[month],
    });
  });

  return dataset;
};

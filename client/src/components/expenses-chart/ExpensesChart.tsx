import { CircularProgress, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { categoriesTotalExpenses } from '../../helpers/mockCategories';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import noExpensesImg from '../../assets/no-expenses-img.svg';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useGetExpensesQuery } from '../../features/expenses/expensesApiSlice';
import { Categories } from '../../helpers/categories';

const ExpensesChart = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data: expenses } = useGetExpensesQuery(uid);

  return (
    <Stack alignItems={'center'} spacing={2}>
      {categoriesTotalExpenses.length > 0 ? (
        <>
          {expenses?.expenses ? (
            <PieChart
              width={210}
              height={210}
              legend={{ hidden: true }}
              series={[
                {
                  data: [
                    ...Object.keys(expenses?.expenses as Record<Categories, number>)
                      .map((category) => ({
                        label: category,
                        value: expenses.expenses[category as Categories],
                        color: categoriesProperties[category].color,
                      }))
                      .filter((item) => item.value !== 0),
                  ],
                  innerRadius: 25,
                  outerRadius: 100,
                  paddingAngle: 3,
                  cornerRadius: 5,
                  cx: 100,
                  cy: 100,
                },
              ]}
            />
          ) : (
            <CircularProgress />
          )}
          <Stack textAlign={'center'} pb={2}>
            <Typography component={'h3'} variant="h5">
              {expenses?.totalExpenses}$
            </Typography>
            <Typography component={'p'} variant="subtitle1">
              Total
            </Typography>
          </Stack>
        </>
      ) : (
        <>
          <img src={noExpensesImg} alt="No expenses" height={200} />
          <Typography component={'h3'} variant="h5">
            No expenses.
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default ExpensesChart;

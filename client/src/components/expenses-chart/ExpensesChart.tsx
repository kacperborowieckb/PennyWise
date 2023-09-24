import { Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { categoriesTotalExpenses } from '../../helpers/mockCategories';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import noExpensesImg from '../../assets/no-expenses-img.svg';

const ExpensesChart = () => {
  return (
    <Stack alignItems={'center'} spacing={2}>
      {categoriesTotalExpenses.length > 0 ? (
        <>
          <PieChart
            width={210}
            height={210}
            legend={{ hidden: true }}
            series={[
              {
                data: [
                  ...categoriesTotalExpenses.map((category) => ({
                    label: category.categoryName,
                    value: category.totalExpenses,
                    color: categoriesProperties[category.categoryName].color,
                  })),
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
          <Stack textAlign={'center'} pb={2}>
            <Typography component={'h3'} variant="h5">
              1253.24$
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

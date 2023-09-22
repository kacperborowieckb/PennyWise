import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { categoriesTotalExpenses } from '../../helpers/mockCategories';

const ExpensesChart = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <PieChart
        width={210}
        height={210}
        colors={['red', 'orange', 'pink', 'blue', 'green']}
        legend={{ hidden: true }}
        series={[
          {
            data: [
              ...categoriesTotalExpenses.map((category) => ({
                label: category.categoryName,
                value: category.totalExpenses,
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
    </Box>
  );
};

export default ExpensesChart;

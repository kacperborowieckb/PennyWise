import { Box } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { categoriesTotalExpenses } from '../../helpers/mockCategories';
import { categoriesProperties } from '../../helpers/categoriesProperties';

const ExpensesChart = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </Box>
  );
};

export default ExpensesChart;

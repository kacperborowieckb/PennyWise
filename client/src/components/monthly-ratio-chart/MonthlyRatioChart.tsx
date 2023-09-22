import { Box, useMediaQuery } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const dataset = [
  {
    income: 60,
    expenses: 63,
    month: 'June',
  },
  {
    income: 59,
    expenses: 60,
    month: 'July',
  },
  {
    income: 65,
    expenses: 60,
    month: 'Aug',
  },
  {
    income: 51,
    expenses: 51,
    month: 'Sept',
  },
];

const valueFormatter = (value: number) => `${value}$`;

const MonthlyRatioChart = () => {
  const matches = useMediaQuery('(max-width:900px)');

  return (
    <Box sx={{ display: 'flex', mt: matches ? -8 : -4 }}>
      <BarChart
        legend={{ hidden: true }}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        dataset={dataset}
        series={[
          { dataKey: 'income', label: 'Income', valueFormatter },
          { dataKey: 'expenses', label: 'Expenses', valueFormatter },
        ]}
        width={400}
        height={300}
        sx={{ transform: 'scale(1.1)' }}
      />
    </Box>
  );
};

export default MonthlyRatioChart;

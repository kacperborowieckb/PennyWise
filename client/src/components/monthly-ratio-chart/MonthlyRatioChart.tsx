import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { green, red } from '@mui/material/colors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { getMonthlyRatioDataSet } from '../../utils/getMonthlyRatioDataSet';
import { useGetTransactionsQuery } from '../../features/transactions/transactionsApiSlice';
import noDataImg from '../../assets/monthly-ratio-no-data.svg';

const valueFormatter = (value: number) => `${value}$`;

const MonthlyRatioChart = () => {
  const matches = useMediaQuery('(max-width:900px)');
  const uid = useAppSelector(selectCurrentUserId);
  const { data, isLoading } = useGetTransactionsQuery(uid);
  const dataset = getMonthlyRatioDataSet(data);
  let content;

  if (isLoading) {
    content = <CircularProgress sx={{ m: '0 auto' }} />;
  } else if (!isLoading && dataset.some((val) => val.expenses !== 0 || val.income !== 0)) {
    content = (
      <BarChart
        legend={{ hidden: true }}
        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
        dataset={dataset}
        series={[
          { dataKey: 'expenses', label: 'Expenses', valueFormatter, color: red[400] },
          {
            dataKey: 'income',
            label: 'Income',
            valueFormatter,
            color: green[400],
          },
        ]}
        width={400}
        height={300}
        sx={{ transform: 'scale(1.1)' }}
      />
    );
  } else {
    content = (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          m: '0 auto',
          mt: matches ? 10 : 4,
        }}
      >
        <img src={noDataImg} alt="No expenses" height={200} />
        <Typography component={'h3'} variant="h5">
          No data.
        </Typography>
      </Box>
    );
  }
  return <Box sx={{ display: 'flex', mt: matches ? -8 : -4 }}>{content} </Box>;
};

export default MonthlyRatioChart;

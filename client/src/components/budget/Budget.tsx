import { Grid, Paper, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts';
import { categoriesTotalExpenses } from '../../helpers/mockCategories';

const Budget = () => {
  return (
    <Paper sx={{ height: '100%', p: 2 }} elevation={6}>
      <Grid container spacing={2} height={'100%'} p={2}>
        <Grid item xs={6} container spacing={2} direction={'column'}>
          <Grid item xs={8}>
            <Typography component={'h1'} variant="h4">
              4523.57$
            </Typography>
            <Typography component={'p'} variant="h6">
              Total
            </Typography>
          </Grid>
          <Grid item xs={4}>
            Chart
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography component={'h2'} variant="h5">
            Expenses
          </Typography>
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
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Budget;

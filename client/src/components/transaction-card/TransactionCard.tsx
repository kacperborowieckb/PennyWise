import { Card, CardContent, Typography } from '@mui/material';
import { categoriesProperties } from '../../helpers/categoriesProperties';

type TransactionCardTypes = {
  value: number;
  category: string;
};

const TransactionCard = ({ value, category }: TransactionCardTypes) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 180, cursor: 'pointer' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: '8px !important',
        }}
      >
        <Typography
          align="center"
          component={'h6'}
          variant="h5"
          sx={{
            px: 1,
            width: '100%',
            borderRadius: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
          bgcolor={
            value > 0 ? (theme) => theme.palette.success.main : (theme) => theme.palette.error.main
          }
        >
          {value + ' $'}
        </Typography>
        <Typography align="center" component={'h6'} variant="h6">
          Category:
        </Typography>
        {categoriesProperties[category.toLowerCase()].icon}
      </CardContent>
    </Card>
  );
};

export default TransactionCard;

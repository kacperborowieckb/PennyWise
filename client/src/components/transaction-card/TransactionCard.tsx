import { Card, CardContent, Typography } from '@mui/material';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import { Categories } from '../../helpers/categories';
import { useGetTransactionsQuery } from '../../features/transactions/transactionsApiSlice';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';

const TransactionCard = ({ id }: { id: string }) => {
  const uid = useAppSelector(selectCurrentUserId);
  const { transaction } = useGetTransactionsQuery(uid, {
    selectFromResult: ({ data }) => ({
      transaction: data?.entities[id],
    }),
  });
  let content;

  if (transaction) {
    content = (
      <Card
        variant="outlined"
        sx={{
          minWidth: 180,
          cursor: 'pointer',
          ':hover': { transform: 'scale(1.03)' },
          transition: 'transform 0.3s ease',
        }}
      >
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
              transaction.category === Categories.income
                ? (theme) => theme.palette.success.main
                : (theme) => theme.palette.error.main
            }
          >
            {transaction.category !== Categories.income && '-'}
            {transaction.amount + ' $'}
          </Typography>
          <Typography align="center" component={'h6'} variant="h6">
            Category:
          </Typography>
          {categoriesProperties[transaction.category.toLowerCase()].icon}
        </CardContent>
      </Card>
    );
  }
  return content;
};

export default TransactionCard;

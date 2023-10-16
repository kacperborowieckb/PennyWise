import { Card, CardContent, Typography, useColorScheme } from '@mui/material';
import { categoriesProperties } from '../../helpers/categoriesProperties';
import { Categories } from '../../helpers/categories';
import { useGetTransactionsQuery } from '../../features/transactions/transactionsApiSlice';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { motion } from 'framer-motion';

const TransactionCard = ({ id }: { id: string }) => {
  const uid = useAppSelector(selectCurrentUserId);
  const { mode } = useColorScheme();
  const { transaction } = useGetTransactionsQuery(uid, {
    selectFromResult: ({ data }) => ({
      transaction: data?.entities[id],
    }),
  });
  let content;
  if (transaction) {
    content = (
      <Card
        layout
        component={motion.div}
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 'auto' }}
        variant="outlined"
        sx={{
          minWidth: 180,
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
              color: mode === 'light' ? (theme) => theme.palette.background.default : undefined,
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

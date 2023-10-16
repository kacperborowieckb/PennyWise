import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetBalanceQuery } from '../../features/balance/balanceApiSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const Balance = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data: balance, isLoading } = useGetBalanceQuery(uid);

  return (
    <>
      <Typography component={'h1'} variant="h4" sx={{ position: 'relative' }}>
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>{balance}$</>
        )}
      </Typography>
      <Typography component={'p'} variant="h6">
        Balance
      </Typography>
    </>
  );
};

export default Balance;

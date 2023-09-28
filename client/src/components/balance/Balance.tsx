import { Info } from '@mui/icons-material';
import { Box, CircularProgress, Tooltip, Typography } from '@mui/material';
import { useGetBalanceQuery } from '../../features/auth/balanceApiSlice';
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
          <>
            {balance}$
            <Tooltip
              title="You can change currency in settings"
              sx={{ position: 'absolute', ml: '3px' }}
              enterTouchDelay={0}
            >
              <Info fontSize="small" />
            </Tooltip>
          </>
        )}
      </Typography>
      <Typography component={'p'} variant="h6">
        Balance
      </Typography>
    </>
  );
};

export default Balance;

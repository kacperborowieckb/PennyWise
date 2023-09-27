import { Info } from '@mui/icons-material';
import { Tooltip, Typography } from '@mui/material';
import { useGetBalanceQuery } from '../../features/auth/balanceApiSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';
import Spinner from '../spinner/Spinner';

const Balance = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data: balance, isLoading } = useGetBalanceQuery(uid);

  return (
    <>
      <Typography component={'h1'} variant="h4" sx={{ position: 'relative' }}>
        {isLoading ? (
          <Spinner />
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

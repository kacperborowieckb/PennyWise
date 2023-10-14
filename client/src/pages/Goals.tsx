import { Box, CircularProgress } from '@mui/material';
import GoalCard from '../components/goal-card/GoalCard';
import { useGetGoalsQuery } from '../features/goals/goalsApiSlice';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectCurrentUserId } from '../features/auth/authSlice';

const Goals = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data, isLoading } = useGetGoalsQuery(uid);
  return (
    <Box
      sx={{
        maxWidth: 1144,
        display: 'flex',
        justifyContent: 'center',
        pt: 6,
        gap: 6,
        flexWrap: 'wrap',
      }}
    >
      {!isLoading ? (
        data?.ids.map((id) => <GoalCard name={id as string} key={id} />)
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default Goals;

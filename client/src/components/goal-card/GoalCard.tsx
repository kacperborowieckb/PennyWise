import { Box, Paper, Typography } from '@mui/material';
import GoalProgress from '../goal-progress/GoalProgress';
import GoalMenu from '../goal-menu/GoalMenu';
import { useGetGoalsQuery } from '../../features/goals/goalsApiSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const GoalCard = ({ name }: { name: string }) => {
  const uid = useAppSelector(selectCurrentUserId);
  const { goal } = useGetGoalsQuery(uid, {
    selectFromResult: ({ data }) => ({ goal: data?.entities[name] }),
  });

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        width: '300px',
        ':hover': { transform: 'scale(1.03)' },
        transition: 'transform 0.3s ease',
      }}
      elevation={4}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography component={'h3'} variant="h5" sx={{ fontWeight: '700', flexGrow: 1 }}>
          {goal?.name}
        </Typography>
        <GoalMenu uid={uid} goal={goal} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '2px',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <Typography variant="body1" sx={{ translate: '0 -25%' }}>
          ${goal?.amount}
        </Typography>
        <Typography component={'span'} variant="h4" sx={{ lineHeight: '100%' }}>
          /
        </Typography>
        <Typography variant="body1" sx={{ translate: '0 25%' }}>
          ${goal?.goal}
        </Typography>
      </Box>
      {goal && (
        <GoalProgress
          value={goal.amount === 0 ? 0 : Math.round((goal.amount / goal.goal) * 10000) / 100}
        />
      )}
    </Paper>
  );
};

export default GoalCard;

import { Box } from '@mui/material';
import GoalCard from '../components/goal-card/GoalCard';

const Goals = () => {
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
      <GoalCard />
      <GoalCard />
      <GoalCard />
    </Box>
  );
};

export default Goals;

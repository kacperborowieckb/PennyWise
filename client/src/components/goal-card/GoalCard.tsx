import { Box, Paper, Typography } from '@mui/material';
import GoalProgress from '../goal-progress/GoalProgress';

const GoalCard = () => {
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
      <Typography component={'h3'} variant="h5" sx={{ fontWeight: '700' }}>
        Goal Title
      </Typography>
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
          $2024.32
        </Typography>
        <Typography component={'span'} variant="h4" sx={{ lineHeight: '100%' }}>
          /
        </Typography>
        <Typography variant="body1" sx={{ translate: '0 25%' }}>
          $2240.32
        </Typography>
      </Box>
      <GoalProgress value={50} />
    </Paper>
  );
};

export default GoalCard;

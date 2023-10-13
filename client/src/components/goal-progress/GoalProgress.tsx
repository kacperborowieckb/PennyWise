import { Box, LinearProgress, Typography, linearProgressClasses, styled } from '@mui/material';

const GoalProgress = ({ value }: { value: number }) => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
    },
  }));
  return (
    <Box>
      <Typography component={'span'} variant="body2" sx={{ mb: '2px' }}>
        {value + '%'}
      </Typography>
      <BorderLinearProgress variant="determinate" value={value} />
    </Box>
  );
};

export default GoalProgress;

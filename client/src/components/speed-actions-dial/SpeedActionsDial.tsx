import { CalendarMonth, Flag, Paid, Savings, Wallet } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

const SpeedActionsDial = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction key={'Add expense'} icon={<Paid />} tooltipTitle={'Add expense'} />
        <SpeedDialAction key={'Add balance'} icon={<Wallet />} tooltipTitle={'Add balace'} />
        <SpeedDialAction key={'Add new goal'} icon={<Flag />} tooltipTitle={'Add new goal'} />
        <SpeedDialAction
          key={'Transfer to goal'}
          icon={<Savings />}
          tooltipTitle={'Transfer to goal'}
        />
        <SpeedDialAction
          key={'Plan a payment'}
          icon={<CalendarMonth />}
          tooltipTitle={'Plan a payment'}
        />
      </SpeedDial>
    </Box>
  );
};

export default SpeedActionsDial;

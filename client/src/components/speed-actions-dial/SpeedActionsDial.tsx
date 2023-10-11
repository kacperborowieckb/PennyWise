import { CalendarMonth, Flag, Paid, Savings, Wallet } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useToggle } from '../../hooks/useToggle';
import AddBalanceDialog from '../add-balance-dialog/AddBalanceDialog';
import AddExpenseDialog from '../add-expense-dialog/AddExpenseDialog';
import AddNewGoalDialog from '../add-new-goal-dialog/AddNewGoalDialog';
import TransferToGoalDialog from '../transfer-to-goal-dialog/TransferToGoalDialog';
import PlanAPaymentDialog from '../plan-a-payment-dialog/PlanAPaymentDialog';

const SpeedActionsDial = () => {
  const [isAddExpenseOpen, ToggleAddExpense] = useToggle(false);
  const [isAddBalanceOpen, ToggleAddBalance] = useToggle(false);
  const [isAddNewGoalOpen, ToggleAddNewGoal] = useToggle(false);
  const [isTransferToGoalOpen, ToggleTransferToGoal] = useToggle(false);
  const [isPlanAPaymentOpen, TogglePlanAPayment] = useToggle(false);

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
        <SpeedDialAction
          key={'Add expense'}
          icon={<Paid />}
          tooltipTitle={'Add expense'}
          onClick={ToggleAddExpense}
        />
        <AddExpenseDialog isOpen={isAddExpenseOpen} Toggle={ToggleAddExpense} />
        <SpeedDialAction
          key={'Add balance'}
          icon={<Wallet />}
          tooltipTitle={'Add balace'}
          onClick={ToggleAddBalance}
        />
        <AddBalanceDialog isOpen={isAddBalanceOpen} Toggle={ToggleAddBalance} />
        <SpeedDialAction
          key={'Add new goal'}
          icon={<Flag />}
          tooltipTitle={'Add new goal'}
          onClick={ToggleAddNewGoal}
        />
        {/* <AddNewGoalDialog isOpen={isAddNewGoalOpen} Toggle={ToggleAddNewGoal} /> */}
        <SpeedDialAction
          key={'Transfer to goal'}
          icon={<Savings />}
          tooltipTitle={'Transfer to goal'}
          onClick={ToggleTransferToGoal}
        />
        {/* <TransferToGoalDialog isOpen={isTransferToGoalOpen} Toggle={ToggleTransferToGoal} /> */}
        <SpeedDialAction
          key={'Plan a payment'}
          icon={<CalendarMonth />}
          tooltipTitle={'Plan a payment'}
          onClick={TogglePlanAPayment}
        />
        <PlanAPaymentDialog isOpen={isPlanAPaymentOpen} Toggle={TogglePlanAPayment} />
      </SpeedDial>
    </Box>
  );
};

export default SpeedActionsDial;

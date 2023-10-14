import { CalendarMonth, Flag, Paid, Savings, Wallet } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useToggle } from '../../hooks/useToggle';
import AddBalanceDialog from '../add-balance-dialog/AddBalanceDialog';
import AddExpenseDialog from '../add-expense-dialog/AddExpenseDialog';
import AddNewGoalDialog from '../add-new-goal-dialog/AddNewGoalDialog';
import TransferToGoalDialog from '../transfer-to-goal-dialog/TransferToGoalDialog';
import PlanAPaymentDialog from '../plan-a-payment-dialog/PlanAPaymentDialog';

const SpeedActionsDial = () => {
  const [isAddExpenseOpen, toggleAddExpense] = useToggle(false);
  const [isAddBalanceOpen, toggleAddBalance] = useToggle(false);
  const [isAddNewGoalOpen, toggleAddNewGoal] = useToggle(false);
  const [isTransferToGoalOpen, toggleTransferToGoal] = useToggle(false);
  const [isPlanAPaymentOpen, togglePlanAPayment] = useToggle(false);

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
          key={'Add balance'}
          icon={<Wallet />}
          tooltipTitle={'Add balance'}
          onClick={toggleAddBalance}
        />
        <AddBalanceDialog isOpen={isAddBalanceOpen} toggle={toggleAddBalance} />
        <SpeedDialAction
          key={'Add expense'}
          icon={<Paid />}
          tooltipTitle={'Add expense'}
          onClick={toggleAddExpense}
        />
        <AddExpenseDialog isOpen={isAddExpenseOpen} toggle={toggleAddExpense} />
        <SpeedDialAction
          key={'Add new goal'}
          icon={<Flag />}
          tooltipTitle={'Add new goal'}
          onClick={toggleAddNewGoal}
        />
        <AddNewGoalDialog isOpen={isAddNewGoalOpen} toggle={toggleAddNewGoal} />
        <SpeedDialAction
          key={'Transfer to goal'}
          icon={<Savings />}
          tooltipTitle={'Transfer to goal'}
          onClick={toggleTransferToGoal}
        />
        <TransferToGoalDialog isOpen={isTransferToGoalOpen} toggle={toggleTransferToGoal} />
        <SpeedDialAction
          key={'Plan a payment'}
          icon={<CalendarMonth />}
          tooltipTitle={'Plan a payment'}
          onClick={togglePlanAPayment}
        />
        <PlanAPaymentDialog isOpen={isPlanAPaymentOpen} toggle={togglePlanAPayment} />
      </SpeedDial>
    </Box>
  );
};

export default SpeedActionsDial;

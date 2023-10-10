import { CalendarMonth, Flag, Paid, Savings, Wallet } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useToogle } from '../../hooks/useToogle';
import AddBalanceDialog from '../add-balance-dialog/AddBalanceDialog';
import AddExpenseDialog from '../add-expense-dialog/AddExpenseDialog';
import AddNewGoalDialog from '../add-new-goal-dialog/AddNewGoalDialog';
import TransferToGoalDialog from '../transfer-to-goal-dialog/TransferToGoalDialog';
import PlanAPaymentDialog from '../plan-a-payment-dialog/PlanAPaymentDialog';

const SpeedActionsDial = () => {
  const [isAddExpenseOpen, toogleAddExpense] = useToogle(false);
  const [isAddBalanceOpen, toogleAddBalance] = useToogle(false);
  const [isAddNewGoalOpen, toogleAddNewGoal] = useToogle(false);
  const [isTransferToGoalOpen, toogleTransferToGoal] = useToogle(false);
  const [isPlanAPaymentOpen, tooglePlanAPayment] = useToogle(false);

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
          onClick={toogleAddExpense}
        />
        <AddExpenseDialog isOpen={isAddExpenseOpen} toogle={toogleAddExpense} />
        <SpeedDialAction
          key={'Add balance'}
          icon={<Wallet />}
          tooltipTitle={'Add balace'}
          onClick={toogleAddBalance}
        />
        <AddBalanceDialog isOpen={isAddBalanceOpen} toogle={toogleAddBalance} />
        <SpeedDialAction
          key={'Add new goal'}
          icon={<Flag />}
          tooltipTitle={'Add new goal'}
          onClick={toogleAddNewGoal}
        />
        <AddNewGoalDialog isOpen={isAddNewGoalOpen} toogle={toogleAddNewGoal} />
        <SpeedDialAction
          key={'Transfer to goal'}
          icon={<Savings />}
          tooltipTitle={'Transfer to goal'}
          onClick={toogleTransferToGoal}
        />
        <TransferToGoalDialog isOpen={isTransferToGoalOpen} toogle={toogleTransferToGoal} />
        <SpeedDialAction
          key={'Plan a payment'}
          icon={<CalendarMonth />}
          tooltipTitle={'Plan a payment'}
          onClick={tooglePlanAPayment}
        />
        <PlanAPaymentDialog isOpen={isPlanAPaymentOpen} toogle={tooglePlanAPayment} />
      </SpeedDial>
    </Box>
  );
};

export default SpeedActionsDial;

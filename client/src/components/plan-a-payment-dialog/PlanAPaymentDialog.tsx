import { DialogProps } from '../../types/DialogProps';

type PlanAPaymentDialogProps = DialogProps & {
  date?: any;
};

const PlanAPaymentDialog = ({ isOpen, toogle, date = 'd' }: PlanAPaymentDialogProps) => {
  return <div>PlanAPaymentDialog</div>;
};

export default PlanAPaymentDialog;

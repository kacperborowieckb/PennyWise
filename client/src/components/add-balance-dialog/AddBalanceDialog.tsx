import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { useAddBalanceMutation } from '../../features/auth/walletApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const AddBalanceDialog = ({ isOpen, toogle }: { isOpen: boolean; toogle: () => void }) => {
  // ADD ERROR IF BALANCE BELOW 0
  const [addBalance] = useAddBalanceMutation();
  const uid = useSelector(selectCurrentUserId);

  const addBalanceTest = () => {
    addBalance({ uid, amount: 200 });
  };

  return (
    <Dialog open={isOpen} onClose={toogle}>
      <DialogTitle>Add balance</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ m: '0 auto' }}>
        <Button onClick={toogle}>Cancel</Button>
        <Button onClick={addBalanceTest} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBalanceDialog;

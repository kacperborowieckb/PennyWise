import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';

const AddExpenseDialog = ({ isOpen, toogle }: { isOpen: boolean; toogle: () => void }) => {
  return (
    <Dialog open={isOpen} onClose={toogle}>
      <DialogTitle>Add expense</DialogTitle>
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
        <Button onClick={toogle} variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;

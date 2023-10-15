import { CompareArrows, Delete, MoreVert, Payment } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { Goals, useDeleteGoalMutation } from '../../features/goals/goalsApiSlice';
import { useToggle } from '../../hooks/useToggle';
import TransferToGoalDialog from '../transfer-to-goal-dialog/TransferToGoalDialog';

type GoalMenuProps = {
  uid: string;
  goal?: Goals;
};

const GoalMenu = ({ uid, goal }: GoalMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const [deleteGoal] = useDeleteGoalMutation();
  const [isConfirmationOpen, toggleConfirmation] = useToggle();
  const [isTransferDialogOpen, toggleTransferDialog] = useToggle();

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  const handleDeleteGoal = async () => {
    try {
      await deleteGoal({ uid, amount: goal?.amount, name: goal?.name }).unwrap();
      toggleConfirmation();
    } catch (err) {
      // toast notification from sonner??
    }
  };

  return (
    <>
      <IconButton sx={{ translate: '0 -4px' }} onClick={openMenu}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        <MenuItem onClick={toggleTransferDialog}>
          <ListItemIcon>
            <Payment />
          </ListItemIcon>
          Transfer
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <CompareArrows />
          </ListItemIcon>
          Withdraw
        </MenuItem>
        <Divider />
        <MenuItem onClick={toggleConfirmation}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      <TransferToGoalDialog
        isOpen={isTransferDialogOpen}
        toggle={toggleTransferDialog}
        goal={goal?.name as string}
      />
      <Dialog open={isConfirmationOpen} onClose={toggleConfirmation} sx={{ p: 4 }}>
        <DialogTitle>Delete {goal?.name}?</DialogTitle>
        <DialogActions sx={{ m: '0 auto', pb: 2 }}>
          <Button variant="contained" onClick={toggleConfirmation}>
            No
          </Button>
          <Button variant="outlined" onClick={handleDeleteGoal}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalMenu;

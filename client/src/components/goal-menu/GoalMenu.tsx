import { CompareArrows, Delete, MoreVert, Payment } from '@mui/icons-material';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

const GoalMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);

  const closeMenu = () => setAnchorEl(null);

  return (
    <>
      <IconButton sx={{ translate: '0 -4px' }} onClick={openMenu}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
        <MenuItem>
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
        <MenuItem>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default GoalMenu;

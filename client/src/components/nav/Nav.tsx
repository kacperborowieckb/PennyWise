import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useColorScheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MouseEvent, useState } from 'react';
import Logo from '../logo/Logo';
import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserName } from '../../features/auth/authSlice';
import { useLogoutMutation } from '../../features/auth/authApiSlice';
import { toast } from 'sonner';
import { AccountCircle, DarkMode, LightMode } from '@mui/icons-material';

const pages = ['Overview', 'Transactions', 'Goals'];
const locationsPath: {
  [key: string]: string;
} = {
  '/': pages[0],
  '/transactions': pages[1],
  '/goals': pages[2],
};

const Nav = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const username = useAppSelector(selectCurrentUserName);
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();

  const handleChangeMode = () => {
    mode === 'dark' ? setMode('light') : setMode('dark');
  };

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    if (isLoading) return;
    try {
      await logout().unwrap();
      handleCloseUserMenu();
      navigate('/welcome');
      toast.success('Logged out');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  return (
    <AppBar position="static" sx={{ borderRadius: 0 }} elevation={6}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo height={64} styles={{ marginTop: '4px' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    backgroundColor:
                      locationsPath[location.pathname] === page
                        ? (theme) => theme.palette.primary.main
                        : undefined,
                  }}
                >
                  <Link
                    textAlign="center"
                    href={`/${page === locationsPath['/'] ? '' : page.toLowerCase()}`}
                    sx={{
                      textDecoration: 'none',
                      color: (theme) => theme.palette.text.primary,
                    }}
                  >
                    {page}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`/${page === locationsPath['/'] ? '' : page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                variant={locationsPath[location.pathname] === page ? 'contained' : 'text'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <IconButton onClick={handleChangeMode} sx={{ mr: 2, color: 'white' }}>
            {mode === 'dark' ? <DarkMode /> : <LightMode />}
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 0 }}>
            <Typography component={'p'} variant="body1">
              {username}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  <AccountCircle sx={{ width: '100%', height: '100%' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout} disabled={isLoading}>
                {isLoading ? (
                  <CircularProgress size={14} sx={{ margin: '0 auto' }} />
                ) : (
                  <Typography textAlign="center">Log out</Typography>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;

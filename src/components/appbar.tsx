import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';

const pages = ['Home', 'Products', 'Pricing', 'Help'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const drawerWidth = 250;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme,  open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function ResponsiveAppBar() {
    // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    // const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget);
    // };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };


    return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
      </AppBar>

      <Drawer
        variant="permanent" open={open}
        anchor="left" >
      <DrawerHeader>
      <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open === true ? handleDrawerClose 
            : open === false ? handleDrawerOpen
            : () => {}}
            edge="start"
            sx={{
              ...(open && { display: '' }),
            }}
          >
            <MenuOpenIcon/>
          </IconButton>
      </DrawerHeader>

          
        <List>
          {settings.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}>
                <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                  {index === 0 ? <PersonIcon /> 
                  : index === 1 ? <ManageAccountsIcon /> 
                  : index === 2 ? <DashboardIcon/>
                  : index === 3 ? <LogoutIcon/> : null}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {pages.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,}}>
                <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                  {index === 0 ? <HomeIcon /> 
                  : index === 1 ? <ShoppingBasketIcon /> 
                  : index === 2 ? <AttachMoneyIcon/>
                  : index === 3 ? <HelpCenterIcon/> : null} 
                </ListItemIcon>
                <ListItemText primary={text}  sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      
        <Toolbar />
      </Box>

    );


    // return (
    //     <AppBar position="static">
    //         <Container maxWidth="xl">
    //             <Toolbar disableGutters>
    //                 <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
    //                 <Typography
    //                     variant="h6"
    //                     noWrap
    //                     component="a"
    //                     href="/"
    //                     sx={{
    //                         mr: 2,
    //                         display: { xs: 'none', md: 'flex' },
    //                         fontFamily: 'monospace',
    //                         fontWeight: 700,
    //                         letterSpacing: '.3rem',
    //                         color: 'inherit',
    //                         textDecoration: 'none',
    //                     }}
    //                 >
    //                     LOGO
    //                 </Typography>

    //                 <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    //                     <IconButton
    //                         size="large"
    //                         aria-label="account of current user"
    //                         aria-controls="menu-appbar"
    //                         aria-haspopup="true"
    //                         onClick={handleOpenNavMenu}
    //                         color="inherit"
    //                     >
    //                         <MenuIcon />
    //                     </IconButton>
    //                     <Menu
    //                         id="menu-appbar"
    //                         anchorEl={anchorElNav}
    //                         anchorOrigin={{
    //                             vertical: 'bottom',
    //                             horizontal: 'left',
    //                         }}
    //                         keepMounted
    //                         transformOrigin={{
    //                             vertical: 'top',
    //                             horizontal: 'left',
    //                         }}
    //                         open={Boolean(anchorElNav)}
    //                         onClose={handleCloseNavMenu}
    //                         sx={{
    //                             display: { xs: 'block', md: 'none' },
    //                         }}
    //                     >
    //                         {pages.map((page) => (
    //                             <MenuItem key={page} onClick={handleCloseNavMenu}>
    //                                 <Typography textAlign="center">{page}</Typography>
    //                             </MenuItem>
    //                         ))}
    //                     </Menu>
    //                 </Box>
    //                 <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
    //                 <Typography
    //                     variant="h5"
    //                     noWrap
    //                     component="a"
    //                     href=""
    //                     sx={{
    //                         mr: 2,
    //                         display: { xs: 'flex', md: 'none' },
    //                         flexGrow: 1,
    //                         fontFamily: 'monospace',
    //                         fontWeight: 700,
    //                         letterSpacing: '.3rem',
    //                         color: 'inherit',
    //                         textDecoration: 'none',
    //                     }}
    //                 >
    //                     LOGO
    //                 </Typography>
    //                 <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    //                     {pages.map((page) => (
    //                         <Button
    //                             key={page}
    //                             onClick={handleCloseNavMenu}
    //                             sx={{ my: 2, color: 'white', display: 'block' }}
    //                         >
    //                             {page}
    //                         </Button>
    //                     ))}
    //                 </Box>

    //                 <Box sx={{ flexGrow: 0 }}>
    //                     <Tooltip title="Open settings">
    //                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
    //                             <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
    //                         </IconButton>
    //                     </Tooltip>
    //                     <Menu
    //                         sx={{ mt: '45px' }}
    //                         id="menu-appbar"
    //                         anchorEl={anchorElUser}
    //                         anchorOrigin={{
    //                             vertical: 'top',
    //                             horizontal: 'right',
    //                         }}
    //                         keepMounted
    //                         transformOrigin={{
    //                             vertical: 'top',
    //                             horizontal: 'right',
    //                         }}
    //                         open={Boolean(anchorElUser)}
    //                         onClose={handleCloseUserMenu}
    //                     >
    //                         {settings.map((setting) => (
    //                             <MenuItem key={setting} onClick={handleCloseUserMenu}>
    //                                 <Typography textAlign="center">{setting}</Typography>
    //                             </MenuItem>
    //                         ))}
    //                     </Menu>
    //                 </Box>
    //             </Toolbar>
    //         </Container>
    //     </AppBar>
    // );
}

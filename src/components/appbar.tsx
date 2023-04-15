import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import MedicationIcon from '@mui/icons-material/Medication';
import Users from "@/api/Users";
import AssignBatchNumberButton from '@/components/AssignBatchNumberButton';
import StartStudyButton from '@/components/StartStudyButton';
import useCurrentUserGlobal from "@/api/useCurrentUser";


let pages: any[] = [];
const pagesBasic = ['Home', 'Products', 'Pricing', 'Help'];
const pagesBavariaFDA = ['Home', 'Products', 'Pricing', 'Help','Drugs'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const functionButtons = [StartStudyButton, AssignBatchNumberButton];
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
    const { currentUserGlobal, setCurrentUserGlobal } = useCurrentUserGlobal();
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
    if (currentUserGlobal == Users.BavariaAdmin) {
      pages = pagesBavariaFDA;
    }
    else if (currentUserGlobal == Users.FDAAdmin) {
      pages = pagesBavariaFDA;
    }

    else if (currentUserGlobal == Users.JHAdmin || currentUserGlobal == Users.JHDoctor)
    {
      pages = pagesBasic;
    }


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };


    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
    ) => {
      setSelectedIndex(index);
      if(selectedIndex == 4 ){
        <Link href="/drugPage" passHref></Link>
      }
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
                px: 2.5,}}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}>
                <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}>
                  {index === 0 ? <HomeIcon /> 
                  : index === 1 ? <ShoppingBasketIcon /> 
                  : index === 2 ? <AttachMoneyIcon/>
                  : index === 3 ? <HelpCenterIcon /> 
                  : index === 4 ? 
                  <Link 
                    href="/drugPage" passHref 
                  ><MedicationIcon/> </Link>
                  : null
                  } 
                </ListItemIcon>
                <ListItemText primary={text}  sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* {functionPages.map((text, index) => (
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
                  {index === 0 ? <BiotechIcon /> 
                  : index === 1 ? <AssignmentTurnedInIcon />  : null} 
                </ListItemIcon>
                <ListItemText primary={text}  sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          ))} */}
          
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <StartStudyButton/> 
              <AssignBatchNumberButton/>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}/>
            </ListItem>
        </List>



        {/* <List>
          {functionButtons.map((button, index) => (
            <ListItem key={button.name} disablePadding sx={{ display: 'block' }}>
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
                  {index === 0 ? <BiotechIcon /> 
                  : index === 1 ? <AssignmentTurnedInIcon /> : null} 
                </ListItemIcon>
                <ListItemText primary={button.name}  sx={{ opacity: open ? 1 : 0 }}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        
      </Drawer>
      
      </Box>

    );
}

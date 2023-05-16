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
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MedicationIcon from '@mui/icons-material/Medication';
import AssignBatchNumberButton from '@/components/AssignBatchNumberButton';
import StartStudyButton from '@/components/StartStudyButton';
import useCurrentUserGlobal from "@/api/useCurrentUser";
import LogoutIcon from '@mui/icons-material/Logout';
import { useUser } from '@auth0/nextjs-auth0/client';
import ConfirmPatientsButton from './ConfirmPatientsButton';

let pages: any[] = [];
const pagesBasic = ['Home'];
const pagesBavariaFDA = ['Home', 'Drugs'];
const drawerWidth = 200;


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
  padding: theme.spacing(0, 3),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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
  const { user, error, isLoading } = useUser();
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

  // if (currentUserGlobal == Users.BavariaAdmin) {
  //   pages = pagesBavariaFDA;
  // }
  // else if (currentUserGlobal == Users.FDAAdmin) {
  //   pages = pagesBavariaFDA;
  // }

  // else if (currentUserGlobal == Users.JHAdmin || currentUserGlobal == Users.JHDoctor) {
  //   pages = pagesBasic;
  // }

  if (user?.name == 'admin@bavaria.com') {
    pages = pagesBavariaFDA;
  }
  else if (user?.name == 'admin@fda.com') {
    pages = pagesBavariaFDA;
  }

  else if (user?.name == 'admin@janehopkins.com' || user?.name == 'doctor@janehopkins.com') {
    pages = pagesBasic;
  }


  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
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
    if (selectedIndex == 1) {
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
                : () => { }}
            edge="start"
            sx={{
              ...(open && { display: '' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          {pages.map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                  {index === 0 ? <HomeIcon /> : index === 1 ?
                    <Link
                      href="/drugPage" passHref
                    ><MedicationIcon /> </Link>
                    : null
                  }
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <Link href="/api/auth/logout" style={{ textDecoration: 'none' }}>
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
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} style={{ color: 'black' }} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </Link>
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

        {((user?.name == 'admin@fda.com' || user?.name == 'doctor@janehopkins.com' || user?.name == 'admin@janehopkins.com') &&
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              {(user?.name == 'doctor@janehopkins.com') || (user?.name == 'admin@janehopkins.com') &&
                <StartStudyButton />}
              {user?.name == 'admin@fda.com' &&
                <AssignBatchNumberButton />}
              <ListItemText sx={{ opacity: open ? 1 : 0 }} />
            </ListItem>
          </List>
        )}
        {(user?.name == 'admin@janehopkins.com' &&
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ConfirmPatientsButton />
            </ListItem>
          </List>
        )}



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

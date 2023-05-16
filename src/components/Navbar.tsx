import { useUser } from '@auth0/nextjs-auth0/client';
import { AppBar, Toolbar, Typography, Button, Link, Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
import React from 'react';


//newest
export default function Navbar() {
  
  const { user, error, isLoading} = useUser();

  if (isLoading) return <div>Loading...</div>;
  //if (error) return <div>{error.message}</div>;
  

    return (
      <AppBar position="static" style={{ width: "100%", backgroundColor: "transparent"}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'black', fontWeight: 1000}}>
            Vendia App
          </Typography>
          

          {!user && <Link href="/api/auth/login" style={{color:'white'}}>
          <Button color="inherit" variant="outlined" style={{ color: "white", marginRight:10, backgroundColor: "rgb(99, 93, 255)"}}>Login</Button>
          </Link>}

          {user && <Link href="/api/auth/logout" style={{color:'white'}}>
         <Button color="inherit" variant="outlined" style={{ color: "white", marginRight:10, backgroundColor: "rgb(99, 93, 255)"}}>Logout</Button>
         </Link>}
        </Toolbar>
      </AppBar>
    );

    
   
}


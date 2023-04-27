import { AppBar, Toolbar, Typography, Button } from '@mui/material';


export default function Navbar() {
    return (
      <AppBar position="static" style={{ width: "100%", backgroundColor: "transparent"}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: 'black', fontWeight: 1000}}>
            Vendia App
          </Typography>
          <Button color="inherit" style=
          {{ color: "black", marginRight:10 }}>Home</Button>
          <Button color="inherit" style={{ color: "black", marginRight:10 }}>About</Button>
          <a href="api/auth/login" style={{color:'white'}}>
            <Button color="inherit" variant="outlined" style={{ color: "white", marginRight:10, backgroundColor: "rgb(99, 93, 255)"}}>Login</Button>
          </a>
        </Toolbar>
      </AppBar>
    );
}
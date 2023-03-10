import React, { useState, useEffect, useReducer } from "react";
import ResponsiveAppBar from '@/components/appbar';
import { Typography, Button, Box, Stack, Modal, TextField, OutlinedInput, FormControl, InputAdornment, FormHelperText, FormLabel, RadioGroup, FormControlLabel, Radio, Container, Drawer } from '@mui/material';
import DataTable from '@/components/data-table';
import Users from "@/api/Users";
import AddPatientForm from "@/components/AddPatientForm";
import SideMenu from "@/components/SubMenu";

import StartStudyButton from "@/components/StartStudyButton";

export default function Home() {
  const [currentUser, setCurrentuser] = React.useState<Users>(Users.JHDoctor);

  // 0 == not started, 1 == started, 2 == finished
  const [studyStatus, setStudyStatus] = React.useState(0);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {

    console.log("ASDASD");
    switch (value) {
      case "Users.JHDoctor":
        setCurrentuser(Users.JHDoctor);
        break;
      case "Users.JHAdmin":
        setCurrentuser(Users.JHAdmin);
        break;
      case "Users.FDAAdmin":
        setCurrentuser(Users.FDAAdmin);
        break;
      case "Users.BavariaAdmin":
        setCurrentuser(Users.BavariaAdmin);
        break;
    }
  }

  return (
    <>
      <ResponsiveAppBar />
      <br></br>

  <StartStudyButton studyStatus={studyStatus} setStudyStatus={setStudyStatus} />
      <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
        <Box sx={{ border: 1, borderLeft: 0, borderColor: '#aaaaaa', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', width: '20%', padding: '10px'}}>
          <SideMenu/>
          <FormControl>
            <FormLabel id="form-user">User</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Users.JHDoctor"
              name="radio-buttons-group"
              onChange={onChange}
            >
              <FormControlLabel value="Users.JHDoctor" control={<Radio />} label="JHDoctor" />
              <FormControlLabel value="Users.JHAdmin" control={<Radio />} label="JHAdmin" />
              <FormControlLabel value="Users.FDAAdmin" control={<Radio />} label="FDAAdmin" />
              <FormControlLabel value="Users.BavariaAdmin" control={<Radio />} label="BavariaAdmin" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{flexGrow: 1}}>
          <DataTable
            currentUser={currentUser}
          />
          <AddPatientForm />
        </Box>
      </Container>
    </>
  );
}

/*
//Allows for the changing of buttons from one to another.
{openViewModal === false ? (
        <Stack
          sx ={{ pt:4}}
          direction = "row"
          justifyContent = "left"
          >
        <Button 
          variant="contained"
          onClick={() => {
            setOpenViewModal(true);
          }}
        >Add
        </Button>

        </Stack>
        ):(
        <Stack
          sx ={{ pt:4}}
          direction = "row"
          justifyContent = "left"
        >
          <Button 
          variant="outlined"
          onClick={() => {
            setOpenViewModal(false);
          }}
        >Cancel
        </Button>
        
        </Stack> 
        )
      }

<Box
  component = "form"
    sx={{
      bgcolor: "white",
      pt: 8,
      pb: 6,
      borderTop: "2px solid blue",
    }}>
  <Typography style = {{marginLeft: 60}}> {format}</Typography>
    <Button 
  variant="contained"
    onClick={handleAdd}
  >Add Patient
    </Button>
  </Box>
<Box
      sx={{
        bgcolor: "white",
        pt: 8,
        pb: 6,
        borderTop: "2px solid blue",
      }}>
        <Typography style = {{marginLeft: 60}}> {format}</Typography>
       
      </Box>
      
      Shows stuff from the button
      */

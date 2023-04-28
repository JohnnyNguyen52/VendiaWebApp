import React from "react";
import ResponsiveAppBar from '@/components/appbar';
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';
import DataTable from '@/components/data-table';
import Users from "@/api/Users";
import AddPatientForm from "@/components/AddPatientForm";
import SideMenu from "@/components/SubMenu";
import StartStudyButton from "@/components/StartStudyButton";
import AssignBatchNumberButton from "@/components/AssignBatchNumberButton";
import useCurrentUserGlobal from "@/api/useCurrentUser";

export default function Home() {
  const [currentUser, setCurrentuser] = React.useState<Users>(Users.JHDoctor);
  const {currentUserGlobal, setCurrentUserGlobal} = useCurrentUserGlobal();

  // 0 == not started, 1 == started, 2 == finished
  let d: any = "";
  fetch("http://localhost:3000/api/items/studyStatus").then((response) => response.json()).then((data) => { d = data });
  const [studyStatus, setStudyStatus] = React.useState(d.studyStatus);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    switch (value) {
      case "Users.JHDoctor":
        setCurrentuser(Users.JHDoctor);
        break;
      case "Users.JHAdmin":
        setCurrentuser(Users.JHAdmin);
        break;
      case "Users.FDAAdmin":
        setCurrentuser(Users.FDAAdmin);
        setCurrentUserGlobal(Users.FDAAdmin);
        break;
      case "Users.BavariaAdmin":
        setCurrentuser(Users.BavariaAdmin);
        setCurrentUserGlobal(Users.BavariaAdmin);
        break;
    }
  }
  
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'col' }}>
    <ResponsiveAppBar currentUser={currentUser}  />
      <Box sx={{ boxShadow: 2, border: 0, borderLeft: 0, borderColor: '#aaaaaa', width: '20%', paddingLeft: '10px'}}>
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
        <AddPatientForm/>
      </Box>

      <Box sx={{flexGrow: 1 }}>
        <DataTable
          currentUser={currentUser}
        />
      </Box>
    </Box>
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


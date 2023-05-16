import React from "react";
import ResponsiveAppBar from '@/components/appbar';
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';
import DataTable from '@/components/data-table';
import Users from "@/api/Users";
import AddPatientForm from "@/components/AddPatientForm";
import SideMenu from "@/components/SubMenu";
import useCurrentUserGlobal from "@/api/useCurrentUser";
import useStudyStatus from "@/api/useStudyStatus";
import { useUser } from '@auth0/nextjs-auth0/client';
import DeletePatientsButton from "@/components/DeletePatientsButton";

export default function Home() {
  const { currentUserGlobal, setCurrentUserGlobal } = useCurrentUserGlobal();
  const { user, error, isLoading } = useUser();

  // 0 == not started, 1 == started, 2 == finished
  const { studyStatus, setStudyStatus } = useStudyStatus();

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
  //   switch (value) {
  //     case "Users.JHDoctor":
  //       setCurrentUserGlobal(Users.JHDoctor);
  //       break;
  //     case "Users.JHAdmin":
  //       setCurrentUserGlobal(Users.JHAdmin);
  //       break;
  //     case "Users.FDAAdmin":
  //       setCurrentUserGlobal(Users.FDAAdmin);
  //       break;
  //     case "Users.BavariaAdmin":
  //       setCurrentUserGlobal(Users.BavariaAdmin);
  //       break;
  //   }
  // }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'col' }}>
      <ResponsiveAppBar />
      <Box sx={{ boxShadow: 2, border: 0, borderLeft: 0, borderColor: '#aaaaaa', width: '20%', paddingLeft: '10px' }}>
        <SideMenu />
        <AddPatientForm />
        <DeletePatientsButton />
        <FormControl>
          <FormLabel id="form-user">User</FormLabel>
          {/* <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="Users.JHDoctor"
            name="radio-buttons-group"
            onChange={onChange}
          >
            <FormControlLabel value="Users.JHDoctor" control={<Radio />} label="JHDoctor" />
            <FormControlLabel value="Users.JHAdmin" control={<Radio />} label="JHAdmin" />
            <FormControlLabel value="Users.FDAAdmin" control={<Radio />} label="FDAAdmin" />
            <FormControlLabel value="Users.BavariaAdmin" control={<Radio />} label="BavariaAdmin" />
          </RadioGroup> */}
        </FormControl>
      </Box>

      {/* <Box sx={{ flexGrow: 1 }}>
        {(studyStatus != 0 || (currentUserGlobal != Users.BavariaAdmin && currentUserGlobal != Users.FDAAdmin)) &&
          <DataTable/>
        }
        {studyStatus == 0 && (currentUserGlobal == Users.BavariaAdmin || currentUserGlobal == Users.FDAAdmin) &&
          <center>
            <h2>Study has not started. Please wait for it to start before viewing patients.</h2>
          </center>
        }
      </Box> */}
      <Box sx={{ flexGrow: 1 }}>
        {(studyStatus != 0 || (user?.name != 'admin@bavaria.com' && user?.name != 'admin@fda.com')) &&
          <DataTable />
        }
        {studyStatus == 0 && (user?.name == 'admin@bavaria.com' || user?.name == 'admin@fda.com') &&
          <center>
            <h2>Study has not started. Please wait for it to start before viewing patients.</h2>
          </center>
        }
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


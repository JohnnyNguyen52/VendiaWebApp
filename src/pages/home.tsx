import React, { useEffect } from "react";
import ResponsiveAppBar from '@/components/appbar';
import { Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';
import DataTable from '@/components/data-table';
import Users from "@/api/Users";
import AddPatientForm from "@/components/AddPatientForm";
import SideMenu from "@/components/SubMenu";
import StartStudyButton from "@/components/StartStudyButton";
import AssignBatchNumberButton from "@/components/AssignBatchNumberButton";

export default function Home() {
  const [currentUser, setCurrentuser] = React.useState<Users>(Users.JHDoctor);

  // 0 == not started, 1 == started, 2 == finished
  let d: any = "";
  fetch("http://localhost:3000/api/items/studyStatus").then((response) => response.json()).then((data) => { d = data })
  .catch((error) => {
   //  console.log("Error fetching data:", error);
  });
  const [studyStatus, setStudyStatus] = React.useState(d.studyStatus);
  const [nextcomponent, setNextcomponent] = React.useState();
  
  useEffect(() => {
    console.log("nextcomponent-> ", nextcomponent)
  }, [nextcomponent])
  return (
    <>
    <ResponsiveAppBar clickedOption={setNextcomponent}/>
    <br/>
      {
        (nextcomponent == 0 || !nextcomponent) && 
        <>
          <AssignBatchNumberButton />
          <StartStudyButton studyStatus={studyStatus} setStudyStatus={setStudyStatus} />
          <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
            <Box sx={{ border: 1, borderLeft: 0, borderColor: '#aaaaaa', borderTopRightRadius: '25px', borderBottomRightRadius: '25px', width: '20%', padding: '10px'}}>
              <SideMenu setUserTYpe={setCurrentuser}/>
            </Box>

            <Box sx={{flexGrow: 1}}>
              <DataTable
                currentUser={currentUser}
              />
              <AddPatientForm />
            </Box>
          </Container>
        </>
      }{
      nextcomponent != 0 &&
      <p>Other component loaded.</p>
      }
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

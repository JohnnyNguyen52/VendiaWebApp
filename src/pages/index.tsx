import React, { useState, useEffect, useReducer } from "react";
import LoginPage from "@/components/LoginPage";
import LandingPage from "@/components/LandingPage";
import { useUser } from '@auth0/nextjs-auth0/client';
import Home from "./home";


export default function Index() {
const { user, error, isLoading} = useUser();

  if(!user)
  {
    return (
      <LandingPage/>
    );
  }
  if(user)
  {
    return (
      <Home/>
    );
  }
  
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

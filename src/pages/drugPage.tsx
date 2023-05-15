import React, { useState, useEffect, useReducer } from "react";
import LoginPage from "@/components/drug-table";
import DrugTable from "@/components/drug-table";
import Users from "@/api/Users";
import { Box, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Container } from '@mui/material';
import AddDrugForm from "@/components/AddDrugForm";
import Link from 'next/link';
import useCurrentUserGlobal from "@/api/useCurrentUser";


export default function DrugPage() {  

  const {currentUserGlobal, setCurrentUserGlobal} = useCurrentUserGlobal();

  console.log("Drug Page");
  console.log(currentUserGlobal);
  return (
    <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
      <Box sx={{flexGrow: 1,  height: 400, width: '100%' }}>
      <Link href="/home" passHref>
        <Button variant="contained">Back</Button>
      </Link>
        <DrugTable currentUser={currentUserGlobal} />
        <AddDrugForm currentUser={currentUserGlobal} />
      </Box>
    </Container>
  );
}

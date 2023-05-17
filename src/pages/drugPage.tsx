import React from "react";
import DrugTable from "@/components/drug-table";
import { Box, Button, Container } from '@mui/material';
import AddDrugForm from "@/components/AddDrugForm";
import Link from 'next/link';

export default function DrugPage() {  
  return (
    <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'row', gap: '10px'}}>
      <Box sx={{flexGrow: 1,  height: 400, width: '100%' }}>
      <Link href="/home" passHref>
        <Button variant="contained">Back</Button>
      </Link>
        <DrugTable />
        <AddDrugForm />
      </Box>
    </Container>
  );
}

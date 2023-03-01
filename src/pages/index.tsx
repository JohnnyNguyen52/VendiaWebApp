import useJaneHopkins from '../hooks/useJaneHopkins';
import ResponsiveAppBar from '@/components/appbar';
import { Typography } from '@mui/material';
import DataTable from '@/components/data-table';
import { GridColDef, GridColumns, GridRowModel, GridRowsProp } from '@mui/x-data-grid';
import React from 'react';

export default function Home() {
  const { entities } = useJaneHopkins();

  //Allows me add patients to JaneHopkins system.
  const addPatient = async () => {
    const addPatientResponse = await entities.patient.add({
      name: "Vanessa",
      dob: "March 3, 2000",
      insuranceNumber: "123456789",
    });
    console.log(addPatientResponse);
  }

  //////////////
  // Example local data
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'age', headerName: 'Age', width: 10 }
  ]
  const rows = [
    { id: 1, name: 'James A', age: 1 },
    { id: 2, name: 'James B', age: 2 },
    { id: 3, name: 'James asdasdasdB', age: 3 },
  ]
  //////////////

  return (
    <>
      <ResponsiveAppBar />
      <br></br>
      <button
        onClick={() => {
          addPatient();
        }}
      >Add Patient
      </button>
      <Typography variant='h3' align='center'>Example table</Typography>
      <DataTable
        columns={columns}
        rows={rows}
      />
    </>
  );
}
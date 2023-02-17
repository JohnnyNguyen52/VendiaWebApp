import useJaneHopkins from '../hooks/useJaneHopkins';
import ResponsiveAppBar from '@/components/appbar';
import { Typography } from '@mui/material';
import DataTable from '@/components/data-table';

export default function Home() {
  const { entities } = useJaneHopkins();

  //Allows me add patients to JaneHopkins system.
  const addPatient = async () => {
    const addPatientResponse = await entities.patient.add({
      name: "Jesse",
      dob: "January 1, 2000",
      insuranceNumber: "114528972",
    });
    console.log(addPatientResponse);
  }
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
      <DataTable />
    </>
  );
}
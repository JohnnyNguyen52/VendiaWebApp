import React from "react";
import ResponsiveAppBar from '@/components/appbar';
import { Box } from '@mui/material';
import DataTable from '@/components/data-table';
import AddPatientForm from "@/components/AddPatientForm";
import SubMenu from "@/components/SubMenu";
import useStudyStatus from "@/api/useStudyStatus";
import { useUser } from '@auth0/nextjs-auth0/client';
import DeletePatientsButton from "@/components/DeletePatientsButton";

export default function Home() {
  const { user } = useUser();
  const { studyStatus } = useStudyStatus();

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'col' }}>
      <ResponsiveAppBar />
      <Box sx={{ boxShadow: 2, border: 0, borderLeft: 0, borderColor: '#aaaaaa', width: '20%', paddingLeft: '10px' }}>
        <SubMenu />
        <AddPatientForm />
        {(user?.name == 'admin@janehopkins.com') &&
          <DeletePatientsButton />
        }
      </Box>
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
import useFinalPatientsConfirm from "@/api/useFinalPatientsConfirm";
import useJaneHopkins from "@/api/useJaneHopkins";
import usePatient from "@/api/usePatient";
import useRefreshKey from "@/api/useRefreshKey";
import useStudyStatus from "@/api/useStudyStatus";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@mui/material";

export default function DeletePatientsButton() {
    const { finalPatientsConfirm: finalPatientsConfirm, setFinalPatientsConfirm: setFinalPatientsConfirm } = useFinalPatientsConfirm();
    const { studyStatus, setStudyStatus } = useStudyStatus();
    const { user } = useUser();
    const { patient, setPatient }: any = usePatient();    // used for the renderCell property for the datagrid columns. Used specifically for the "placebo"
    const { entities } = useJaneHopkins();
    const { count, setCount } = useRefreshKey();

    const handleRemove = async () => {
            await entities.patient.remove(patient[0].id)
            setCount(count + 1); // Refresh data table
    }

    return (
        <>
            {(user?.name == "admin@janehopkins.com" &&
                <Button
                    name="deleteButton"
                    variant="contained"
                    disabled={(finalPatientsConfirm != 0) || (studyStatus != 0)}
                    onClick={handleRemove}
                >Delete
                </Button>
            )}
        </>
    )
}
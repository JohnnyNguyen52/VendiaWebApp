import useFinalPatientsConfirm from "@/api/useFinalPatientsConfirm";
import useJaneHopkins from "@/api/useJaneHopkins";
import usePatient from "@/api/usePatient";
import useRefreshKey from "@/api/useRefreshKey";
import useStudyStatus from "@/api/useStudyStatus";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function DeletePatientsButton() {
    const { finalPatientsConfirm: finalPatientsConfirm, setFinalPatientsConfirm: setFinalPatientsConfirm } = useFinalPatientsConfirm();
    const { studyStatus, setStudyStatus } = useStudyStatus();
    const { user } = useUser();
    const { patient, setPatient }: any = usePatient();    // used for the renderCell property for the datagrid columns. Used specifically for the "placebo"
    const { entities } = useJaneHopkins();
    const [refreshKey, setRefreshKey] = useState(false);
    const { count, setCount } = useRefreshKey();

    useEffect(() => {
        const removePatient = async () => {
            const removeDrugResponse = await entities.patient.remove(patient[0].id)
            console.log(removeDrugResponse);
        }
        if (patient[0] && refreshKey) {
            removePatient();
            setCount(count + 1);
            setRefreshKey(false);
        }
    }, [refreshKey]);

    const handleRemove = async () => {
        setRefreshKey(!refreshKey);
    }

    return (
        <Button
            name="deleteButton"
            variant="contained"
            disabled={(finalPatientsConfirm != 0) && (studyStatus != 0) && (user?.name != 'admin@janehopkins.com')}
            onClick={handleRemove}
        >Delete
        </Button>
    )
}
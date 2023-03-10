import { Button } from "@mui/material";
import React from "react";

export default function StartStudyButton({ studyStatus, setStudyStatus }
    : { studyStatus: number, setStudyStatus: React.Dispatch<React.SetStateAction<number>> }) {

        let defaultVar = ""
        switch (studyStatus) {
            case 0:
                defaultVar = "Start Study";
                break;
            
            case 1:
                defaultVar = "Finish Study";
                break;

            case 2:
                defaultVar = "Study Finished";
                break;
        
            default:
                break;
        }
        const [status, setStatus] = React.useState(defaultVar);

        const onClick = () =>
        {
        switch (studyStatus) {
            case 0:
                setStatus("Finish Study");
                setStudyStatus(1);
                break;
            case 1:
                setStatus("Study Finished");
                setStudyStatus(2);
                break;
            case 2:
                setStatus("Reset Study");
                setStudyStatus(0);
                break;
        }
        }

    

    return (
        <Button onClick={onClick} variant="contained">{status}</Button>
    );
}
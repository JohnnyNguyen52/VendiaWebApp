import { Button, ListItemButton, setRef } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import React, { useEffect } from "react";
import BiotechIcon from '@mui/icons-material/Biotech';
import useStudyStatus from "@/api/useStudyStatus";

export default function StartStudyButton() {
    const [refreshKey, setRefreshKey] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    // This button component will update this global studyStatus hook with the backend studyStatus.
    const { studyStatus, setStudyStatus } = useStudyStatus();


    const onClick = () => {
        setRefreshKey(!refreshKey);
    }

    useEffect(() => {
        const changeStudyStatus = async () => {
            switch (studyStatus) {
                case 0:
                    setStudyStatus(1);
                    setButtonText("Stop Study");
                    break;

                case 1:
                    setStudyStatus(2);
                    setButtonText("Study Finished");
                    break;

                case 2:
                    setStudyStatus(0);
                    setButtonText("Start Study");
                    break;
            }
        }

        changeStudyStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey])

    return (
        // <Button onClick={onClick} variant="contained">{status}</Button>
        <ListItemButton onClick={onClick}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                <BiotechIcon />
            </ListItemIcon>
            {buttonText}
        </ListItemButton>
    );
}
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import React, { useEffect } from "react";
import useStudyStatus from "@/api/useStudyStatus";
import BiotechIcon from '@mui/icons-material/Biotech';
import useFinalDrugsConfirm from "@/api/useFinalDrugsConfirm";
import useFinalPatientsConfirm from "@/api/useFinalPatientsConfirm";

export default function StartStudyButton() {
    const [open, setOpen] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(false);
    const { studyStatus, setStudyStatus } = useStudyStatus();
    const { finalDrugsConfirm, setFinalDrugsConfirm } = useFinalDrugsConfirm();
    const { finalPatientsConfirm, setFinalPatientsConfirm } = useFinalPatientsConfirm();
    let buttonText = "";

    const handleCancel = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        switch (studyStatus) {
            case 0:
                setStudyStatus(1);
                break;

            case 1:
                setStudyStatus(2);
                break;

            case 2:
                setStudyStatus(0);
                break;
        }
    };

    const onStudyButtonClick = () => {
        setOpen(true);
    }

    switch (studyStatus) {
        case 0:
            buttonText = "Start Study";
            break;

        case 1:
            buttonText = "Stop Study";
            break;

        case 2:
            buttonText = "Study Finished";
            break;
    }

    return (
        <>
            <ListItemButton disabled={finalDrugsConfirm == 0 || finalPatientsConfirm == 0} onClick={onStudyButtonClick}>
                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                    <BiotechIcon />
                </ListItemIcon>
                {buttonText}
            </ListItemButton>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Study Status Change"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to change the study status?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
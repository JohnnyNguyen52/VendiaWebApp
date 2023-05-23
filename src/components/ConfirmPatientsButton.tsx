import useFinalPatientsConfirm from "@/api/useFinalPatientsConfirm";
import { ListItemButton, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';

// Button to confirm the patient list as final
export default function ConfirmPatientsButton() {
    const [open, setOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(false);
    const { finalPatientsConfirm: finalPatientsConfirm, setFinalPatientsConfirm: setFinalPatientsConfirm } = useFinalPatientsConfirm();

    const dialogTitleConfirm = "Send Patients";
    const dialogMsgConfirm = "Are you sure that you want to send the patients?";

    const dialogTitleUndo = "Undo Patients";
    const dialogMsgUndo = "Are you sure that you want to undo the patient sending?";

    let dialogTitle = "";
    let dialogMsg = "";

    const onClick = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        setOpen(false);
        if (finalPatientsConfirm == 0) {
            setFinalPatientsConfirm(1);
            dialogTitle = (dialogTitleUndo);
            dialogMsg = (dialogMsgUndo);
        }
        else {
            setFinalPatientsConfirm(0);
            dialogTitle = (dialogTitleConfirm);
            dialogMsg = (dialogMsgConfirm);
        }
    }

    if (finalPatientsConfirm == 0) {
        dialogTitle = (dialogTitleConfirm);
        dialogMsg = (dialogMsgConfirm);
    }
    else {

        dialogTitle = (dialogTitleUndo);
        dialogMsg = (dialogMsgUndo);
    }

    return (
        <>
            <ListItemButton onClick={onClick}>
                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                    <SendIcon />
                </ListItemIcon>
                {finalPatientsConfirm == 0 && "Send Patients"}
                {finalPatientsConfirm == 1 && "Undo Patients"}
            </ListItemButton>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogMsg}
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
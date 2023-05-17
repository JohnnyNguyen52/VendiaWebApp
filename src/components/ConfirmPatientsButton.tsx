import useFinalPatientsConfirm from "@/api/useFinalPatientsConfirm";
import { ListItemButton, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';

// Button to confirm the patient list as final
export default function ConfirmPatientsButton() {
    const [open, setOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(false);
    const { finalPatientsConfirm: finalPatientsConfirm, setFinalPatientsConfirm: setFinalPatientsConfirm } = useFinalPatientsConfirm();

    const onClick = () => {
        setOpen(true);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const handleConfirm = () => {
        setOpen(false);
        setRefreshKey(!refreshKey);
    }
    useEffect(() => {

        const changeFinalPatientsConfirm = async () => {
            if (refreshKey) {
                setFinalPatientsConfirm(1);
                setRefreshKey(!refreshKey);
            }
        }
        changeFinalPatientsConfirm();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey])

    return (
        <>
            <ListItemButton disabled={finalPatientsConfirm == 1} onClick={onClick}>
                <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                    <SendIcon />
                </ListItemIcon>
                {finalPatientsConfirm == 0 && "Send Patients"}
                {finalPatientsConfirm == 1 && "Patients Sent"}
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
                        Are you sure you want to send patient data to FDA?
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
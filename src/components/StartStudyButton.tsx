import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItemButton } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import React, { useEffect } from "react";
import useStudyStatus from "@/api/useStudyStatus";
import BiotechIcon from '@mui/icons-material/Biotech';

export default function StartStudyButton() {
    const [open, setOpen] = React.useState(false);
    const [refreshKey, setRefreshKey] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    // This button component will update this global studyStatus hook with the backend studyStatus.
    const { studyStatus, setStudyStatus } = useStudyStatus();

    const handleCancel = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        setOpen(false);
        setRefreshKey(!refreshKey);
    };

    const onStudyButtonClick = () => {
        setOpen(true);
    }

    useEffect(() => {

        const changeStudyStatus = async () => {
            switch (studyStatus) {
                case 0:
                    if (refreshKey)
                    {
                        setStudyStatus(1);
                        setRefreshKey(!refreshKey);

                    }
                    setButtonText("Stop Study");
                    break;

                case 1:
                    if (refreshKey)
                    {
                        setStudyStatus(2);
                        setRefreshKey(!refreshKey);

                    }
                    setButtonText("Study Finished");
                    break;

                case 2:
                    if (refreshKey)
                    {
                        setStudyStatus(0);
                        setRefreshKey(!refreshKey);

                    }
                    setButtonText("Start Study");
                    break;
            }
        }
        changeStudyStatus();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshKey])

    return (
        <>
            <ListItemButton onClick={onStudyButtonClick}>
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
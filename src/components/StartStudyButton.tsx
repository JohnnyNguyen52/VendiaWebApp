import { VendiaWebAppAPI } from "@/api/VendiaWebAppAPI";
import { Button, ListItemButton, setRef } from "@mui/material";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { color } from "@mui/system";
import React, { useEffect } from "react";
import CSS from 'csstype';
import BiotechIcon from '@mui/icons-material/Biotech';

export default function StartStudyButton() {
    const [refreshKey, setRefreshKey] = React.useState(false);
    const [status, setStatus] = React.useState(-1);
    const [buttonText, setButtonText] = React.useState('');

    const onClick = () => {
        setRefreshKey(!refreshKey);
    }

    useEffect(() => {
        const changeStudyStatus = async () => {
            let s: number = await VendiaWebAppAPI.getStudyStatus() as number;
            switch (s) {
                case 0:
                    VendiaWebAppAPI.setStudyStatus(1);
                    setButtonText("Stop Study");
                    break;

                case 1:
                    VendiaWebAppAPI.setStudyStatus(2);
                    setButtonText("Study Finished");
                    break;

                case 2:
                    VendiaWebAppAPI.setStudyStatus(0);
                    setButtonText("Start Study");
                    break;
            }
        }

        changeStudyStatus();
    }, [refreshKey])

    return (
        // <Button onClick={onClick} variant="contained">{status}</Button>
        <ListItemButton onClick={onClick}>
        <ListItemIcon sx={{minWidth: 0, mr: 3, justifyContent: 'center'}}>
            <BiotechIcon />
        </ListItemIcon>
        {buttonText}
        </ListItemButton>
    );
}
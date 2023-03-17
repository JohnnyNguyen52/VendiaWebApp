import { VendiaWebAppAPI } from "@/api/VendiaWebAppAPI";
import { Button, setRef } from "@mui/material";
import React, { useEffect } from "react";

export default function StartStudyButton() {
    const [refreshKey, setRefreshKey] = React.useState(false);
    const [status, setStatus] = React.useState(-1);

    const onClick = () => {
        setRefreshKey(!refreshKey);
    }

    useEffect(() => {
        const fetchStatus = async () => {
            let s: number = await VendiaWebAppAPI.getStudyStatus() as number;
            switch (s) {
                case 0:
                    setStatus(await VendiaWebAppAPI.setStudyStatus(1));
                    break;

                case 1:
                    setStatus(await VendiaWebAppAPI.setStudyStatus(2));
                    break;

                case 2:
                    setStatus(await VendiaWebAppAPI.setStudyStatus(0));
                    break;
            }
        }

        fetchStatus();
    }, [refreshKey])

    return (
        <Button onClick={onClick} variant="contained">{status}</Button>
    );
}
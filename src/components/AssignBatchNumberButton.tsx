import { VendiaWebAppAPI } from "@/api/VendiaWebAppAPI";
import { Button, ListItemButton, ListItemIcon } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentTurnedIn from "@mui/icons-material/AssignmentTurnedIn";

export default function AssignBatchNumberButton()
{
    const buttonText = 'Assign Batch Number';
    return(
        //<Button variant='text' onClick={() => {VendiaWebAppAPI.AssignBatchNumber()}}>Assign Batch Numbers</Button>
        <ListItemButton onClick={() => {VendiaWebAppAPI.AssignBatchNumber()}}>
        <ListItemIcon sx={{minWidth: 0, mr: 3, justifyContent: 'center'}}>
            <AssignmentTurnedInIcon/>
        </ListItemIcon>
        {buttonText}
        </ListItemButton>
     )
}
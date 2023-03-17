import { VendiaWebAppAPI } from "@/api/VendiaWebAppAPI";
import { Button } from "@mui/material";

export default function AssignBatchNumberButton()
{
    return(
        <Button variant='contained' onClick={() => {VendiaWebAppAPI.AssignBatchNumber()}}>Assign Batch Numbers</Button>
    )
}
import { BatchNumberAPI } from "@/api/BatchNumberAPI";
import { Button } from "@mui/material";

export default function AssignBatchNumberButton()
{
    return(
        <Button variant='contained' onClick={() => {BatchNumberAPI.AssignBatchNumber()}}>Assign Batch Numbers</Button>
    )
}
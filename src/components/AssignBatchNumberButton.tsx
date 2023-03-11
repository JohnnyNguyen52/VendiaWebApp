import AssignBatchNumber from "@/api/assignBatchNumber";
import { Button } from "@mui/material";

export default function AssignBatchNumberButton()
{
    return(
        <Button variant='contained' onClick={() => {AssignBatchNumber()}}>Assign Batch Numbers</Button>
    )
}
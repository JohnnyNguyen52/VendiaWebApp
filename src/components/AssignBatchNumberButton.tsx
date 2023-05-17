import { ListItemButton, ListItemIcon } from "@mui/material";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import useRefreshKey from "@/api/useRefreshKey";
import useJaneHopkins from "@/api/useJaneHopkins";
import React, { useState, useEffect } from "react";

export default function AssignBatchNumberButton() {
    //had to circumvent the VendiaWebAppAPI because i wasn't able to add refreshKey to it.
    const { entities } = useJaneHopkins();
    const { count, setCount }: any = useRefreshKey();
    const [patients, setPatients] = React.useState<any[]>([]);
    const [drugs, setDrugs] = React.useState<any[]>([]);

    const listPatients = async () => {
        let patientList = await entities.patient.list();
        setPatients(patientList.items);

    };
    const listDrugs = async () => {
        let drugs = await entities.drug.list();
        setDrugs(drugs.items);
    };

    useEffect(() => {
        listPatients();
        listDrugs();
    }, [count]);


    const getBatchNumbers = async () => {

        // Fetch the 2 batch numbers. Should only be 2 in the table.
        let batchNumbers: string[] = [];
        drugs.forEach((drug: { batchNumber: string; }) => {
            if (batchNumbers.find(x => x == drug.batchNumber) == undefined) {
                batchNumbers.push(drug.batchNumber);
            }
        });
        return batchNumbers;
    }

    // Randomly assigns batch number to all patients
    const assignBatchNumber = async () => {

        let patients = await entities.patient.list();

        let batchNumbers = await getBatchNumbers();
        let x = 0;
        // Randomly select a batch number for each patient.
        patients.items.forEach((patient: { _id: any, dosesID: string, currentDosage: string }) => {
            if (Math.random() > .5) {
                x = 1
            }
            entities.patient.update({
                _id: patient._id,
                dosesID: batchNumbers[x],
                currentDosage: "0",
            })
        });
        setCount(count + 1)
    }


    const buttonText = 'Assign Batch Number';
    return (
        //<Button variant='text' onClick={() => {VendiaWebAppAPI.AssignBatchNumber()}}>Assign Batch Numbers</Button>
        <ListItemButton onClick={() => {
            assignBatchNumber()
        }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: 'center' }}>
                <AssignmentTurnedInIcon />
            </ListItemIcon>
            {buttonText}
        </ListItemButton>
    )
}
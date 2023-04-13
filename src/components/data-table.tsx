import { BatchNumberAPI } from "@/api/BatchNumberAPI";
import useJaneHopkins from "@/api/useJaneHopkins";
import useRefreshKey from "@/api/useRefreshKey";
import Users from "@/api/Users";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid"
import React, { useEffect } from "react";

function removePII(columns: GridColDef[]) {
    columns.splice(columns.findIndex(i => i.field == 'patientPicture'), 1);
    columns.splice(columns.findIndex(i => i.field == 'name'), 1);
}

/**
 * Data Table used to display patient info.
 * Mark rows or columns as editable if necessary. e.g columns={[{ field: 'name', editable: true }]}
 *
 * @param {any[]} rows Rows to display
 * @param {GridColDef[]} columns Columns to display
 * @public
 */
function DataTable({ currentUser }: { currentUser: Users }) {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = React.useState<any[]>([]);
    const [drugs, setDrugs] = React.useState<any[]>([]);
    const {count, setCount} : any = useRefreshKey();


    let rows: any[] = [];

    let columns = [
        { field: 'patientPicture', headerName: 'Picture', width: 125 },
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'dob', headerName: 'Date of Birth', width: 100 },
    ];

    //List patients
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
    },[count]);

    // return true if placebo, false if not placebo
    const getBatchNumberPlacebo = (batchNumber:any) =>
    {
        return drugs.find(drug => drug.batchNumber == batchNumber).placebo;
    }

    if (currentUser == Users.BavariaAdmin) {
        removePII(columns);
        //Pushes out the info to the data table.
        for (let i = 0; i < patients.length; i++) {
            rows.push({
                id: patients[i]._id,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
            });
        }
    }
    else if (currentUser == Users.FDAAdmin) {
        removePII(columns);
        columns.push({ field: 'batchNumber', headerName: 'Batch #', width: 100 });
        columns.push({ field: 'placebo', headerName: 'placebo', width: 100 });

        //Pushes out the info to the data table.
        for (let i = 0; i < patients.length; i++) {
            rows.push({
                id: patients[i]._id,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
                batchNumber: patients[i].batchNumber,
               // placebo: getBatchNumberPlacebo(patients[i].batchNumber)
            });
        }

        if (columns.indexOf({ field: 'medication', headerName: 'Medication', width: 100 }) != -1)
        {
            columns.push({ field: 'medication', headerName: 'Medication', width: 100 });
        }
    }

    else if (currentUser == Users.JHAdmin || currentUser == Users.JHDoctor)
    {
        //Pushes out the info to the data table.
        for (let i = 0; i < patients.length; i++) {
            rows.push({
                patientPicture: patients[i].patientPicture,
                id: patients[i]._id,
                name: patients[i].name,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
            });
        }
    }

        /**
         * Called when a row has been edited and "Enter" key was pressed to save
         * 
         * @param newRow 
         * @param oldRow 
         * @returns the new row to display in the DataGrid component
         */
        const processRowUpdate =
            async (newRow: GridRowModel, oldRow: GridRowModel) => {
                // MODIFY VENDIA DATABASE HERE WHEN TABLE GETS EDITED
                console.log("New row vals: " + newRow);
                console.log("Old Row vals: " + oldRow);

                return newRow;
            };

        /**
         * Called when processRowUpdate errors. Receives the thrown error from processRowUpdate
         * 
         * @param error 
         */
        const processRowUpdateError =
            async (error: any) => {

                // Display message saying error was made
                console.log(error);
            };

        return (
            <>
                <div className="table" style={{ height: '100%', width: '100%' }}>
                    <DataGrid
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={processRowUpdateError}
                        experimentalFeatures={{ newEditingApi: true }}
                        rows={rows}
                        columns={columns}
                    />
                </div>
            </>
        )
    }
    export default DataTable;

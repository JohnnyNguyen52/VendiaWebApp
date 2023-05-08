import useJaneHopkins from "@/api/useJaneHopkins";
import useRefreshKey from "@/api/useRefreshKey";
import Users from "@/api/Users";
import {Button,} from "@mui/material";
import { DataGrid, GridColDef, GridRowModel, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter, } from "@mui/x-data-grid"
import usePatient from "@/api/usePatient";

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

    const {patient, setPatient}: any = usePatient();
    let rows: any[] = [];
    
    let columns = [
        { field: 'patientPicture', headerName: 'Picture', width: 125 },
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'dob', headerName: 'Date of Birth', width: 100 },
        { field: 'currentDosage', headerName: 'Current Dosage', width: 150 },
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
        let x = drugs.find(drug => drug.batchNumber == batchNumber);
        if (x == null){
            return false
        }
        else{
        return x.placebo;
        }
    }
    let dosageString =""
    for (let i = 0; i < patients.length; i++) {
        for(let x = 0; x < drugs.length; x++){
            if(drugs[x].batchNumber === patients[i].dosesID){
                dosageString = patients[i].currentDosage + "/" + drugs[x].dosage
            }
        }
    if (currentUser == Users.BavariaAdmin) {
        removePII(columns);
        //Pushes out the info to the data table.

            rows.push({
                id: patients[i]._id,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
            });
        
    }
    else if (currentUser == Users.FDAAdmin) {
        removePII(columns);
        columns.push({ field: 'batchNumber', headerName: 'Batch #', width: 100 });
        columns.push({ field: 'placebo', headerName: 'placebo', width: 100 });

     
            rows.push({
                id: patients[i]._id,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
                batchNumber: patients[i].dosesID,
                placebo: getBatchNumberPlacebo(patients[i].dosesID)
            });
        

    }

    else if (currentUser == Users.JHAdmin || currentUser == Users.JHDoctor)
    {
        //Pushes out the info to the data table.
       
            rows.push({
                patientPicture: patients[i].patientPicture,
                currentDosage:dosageString,
                id: patients[i]._id,
                name: patients[i].name,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
            });
        
    }
}

const increaseDosageAmount = async() => {
    console.log(patient[0])
    const termArray = (patient[0].currentDosage).split("/")
    let number = Number(termArray[0])+1
    // const actualPatient = await entities.patient.get(patient[0].id)
    // console.log(actualPatient)
    // actualPatient.currentDosage = String(number);
    // console.log(actualPatient)
    // const updateProductResponse = await entities.patient.update(actualPatient)
    const response = await entities.patient.update({
        _id: patient[0].id,
        currentDosage: String(number),
      })
      setCount(count+1)
  };
  const decreaseDosageAmount = async() => {
    console.log(patient[0])
    const termArray = (patient[0].currentDosage).split("/")
    let number = Number(termArray[0])-1
    // const actualPatient = await entities.patient.get(patient[0].id)
    // console.log(actualPatient)
    // actualPatient.currentDosage = String(number);
    // console.log(actualPatient)
    // const updateProductResponse = await entities.patient.update(actualPatient)
    const response = await entities.patient.update({
        _id: patient[0].id,
        currentDosage: String(number),
      })
      setCount(count+1)
  };

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
    const onRowsSelectionHandler = (ids: any[]) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        setPatient(selectedRowsData);
        };
            function CustomToolbar() {
                return (
                  <GridToolbarContainer
                    sx={{ justifyContent: "space-between", height: "50px" }}
                  >
                    <div>
                    <GridToolbarQuickFilter />
                    <GridToolbarFilterButton />
                    <Button
                        variant="contained"
                        onClick={increaseDosageAmount}
                        sx={{ mx: 2 }}
                            >
                        Increase Dosage
                    </Button>
                    <Button
                        variant="contained"
                        onClick={decreaseDosageAmount}
                        sx={{ mx: 2 }}
                            >
                        Decrease Dosage
                    </Button>
                    </div>
                  </GridToolbarContainer>
                );
              }
        return (
            <>
                <div className="table" style={{ height: '100%' , width: '100%' }}>
                    <DataGrid 
                        processRowUpdate={processRowUpdate}
                        onProcessRowUpdateError={processRowUpdateError}
                        experimentalFeatures={{ newEditingApi: true }}
                        rows={rows}
                        columns={columns}
                        components={{ Toolbar: CustomToolbar }}
                        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                    />
                </div>
            </>
        )
    }
    export default DataTable;

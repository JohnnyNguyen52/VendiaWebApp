import useJaneHopkins from "@/api/useJaneHopkins";
import useRefreshKey from "@/api/useRefreshKey";
import Users from "@/api/Users";
import {Button,} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams, GridRowModel, GridToolbarContainer, GridToolbarFilterButton, GridToolbarQuickFilter, } from "@mui/x-data-grid"
import usePatient from "@/api/usePatient";
import { useUser } from '@auth0/nextjs-auth0/client';

import React, { useEffect } from "react";
import useCurrentUserGlobal from "@/api/useCurrentUser";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import useStudyStatus from "@/api/useStudyStatus";

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
function DataTable() {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = React.useState<any[]>([]);
    const [drugs, setDrugs] = React.useState<any[]>([]);
    const { count, setCount }: any = useRefreshKey();
    const { currentUserGlobal, setCurrentUserGlobal } = useCurrentUserGlobal();
    const { user} = useUser();
    const { studyStatus, setStudyStatus } = useStudyStatus();
    const {patient, setPatient}: any = usePatient();    // used for the renderCell property for the datagrid columns. Used specifically for the "placebo"
    // and "eligible column"
    const renderTrueFalse = (params: GridRenderCellParams<Date>) => {
        // render cell based on the value of each row. row value is either "true" or "false"
        return (
            <>
                {((params.row.placebo == true) ? <CheckIcon /> : <CloseIcon />)}
            </>
        );

    };
    
    const renderTrueFalseE = (params: GridRenderCellParams<Date>) => {
        // render cell based on the value of each row. row value is either "true" or "false"
        return (
            <>
                {((params.row.eligible == true) ? <CheckIcon /> : <CloseIcon />)}
            </>
        );

    };

    let rows: any[] = [];
    let columns: GridColDef[] = [
        {
            field: 'eligible', headerName: 'Eligible', width: 100,
            // render cell based on the value of each row. row value is either "true" or "false"
            renderCell: renderTrueFalseE
        },
        {
            field: 'patientPicture', headerName: 'Picture', width: 125,
            renderCell: (params: GridRenderCellParams<Date>) => {
                return (
                    <Image src={params.row} alt=""/>
                )
            }
        },
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'dob', headerName: 'Date of Birth', width: 100 },
        { field: 'currentDosage', headerName: 'Current Dosage', width: 150 },
    ];

    useEffect(() => {
        //List patients
        const listPatients = async () => {
            let patientList = await entities.patient.list();
            setPatients(patientList.items);

        };
        const listDrugs = async () => {
            let drugs = await entities.drug.list();
            setDrugs(drugs.items);
        };
        listPatients();
        listDrugs();
    }, [count, entities.drug, entities.patient]);

    // return true if placebo, false if not placebo
    const getBatchNumberPlacebo = (batchNumber: any) => {
        let x = drugs.find(drug => drug.batchNumber == batchNumber);
        if (x == null){
        return false
        }
        else{
        return x.placebo;
        }
    }

    const isPatientEligible = (patient: any)=>{
        let healthCodes = [];
        const dob = new Date(patient.dob);
        for(let num = 0; num < patient.icdHealthCodes.length; num++){
            healthCodes.push(patient.icdHealthCodes[num].code)
        }


            if ((healthCodes.find(x=> x.startsWith('O')) != undefined)  || (dob > new Date('2005-01-01'))) {
                return false
            }
            else{
             return true
            }
    };

    const isDone = (dosageString: any) => {
    const termArray = dosageString.split("/")
    if(Number(termArray[0]) == Number(termArray[1])){
        return true

    }
    else{
        return false
    }
    };
    const allDone = (patients: any) =>{
        let done: any[] = [];
        
        if (currentUserGlobal == Users.BavariaAdmin || currentUserGlobal == Users.FDAAdmin ){
            return null;
        }
        for(let num = 0; num < patients.length; num++){
            done.push(isDone(patients[num].currentDosage))

        }
        if (done.includes(false) ){
            return false
        }
        else{
            return true
        }
        // console.log(done)

    }
        // let healthCodes = patient.icdHealthCodes.code;
        // console.log(healthCodes)
        // console.log(healthCodes[0].startsWith('O'))
        
        // Exclude ICD-10 Pregnancy codes
        // if (healthCodes.find((x) => { x.startsWith('O') }) != undefined) {
        //     console.log('test')
        // }
    
        // // Exclude DOB greater than 1/1/2005
        // if (dob > new Date('2005-01-01')) {
        //     return false;
        // }
    
        // Add more eligibility checks here as needed


    let dosageString =""
    for (let i = 0; i < patients.length; i++) {
        for(let x = 0; x < drugs.length; x++){
            if(drugs[x].batchNumber === patients[i].dosesID){
                dosageString = patients[i].currentDosage + "/" + drugs[x].dosage
            }
        }
    if (user?.name == 'admin@bavaria.com') {
        removePII(columns);
        //Pushes out the info to the data table.
            rows.push({
                id: patients[i]._id,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
                eligible: isPatientEligible(patients[i]),
            });
        
    }

    else if (user?.name == 'admin@fda.com') {
        removePII(columns);
        columns.push({ field: 'batchNumber', headerName: 'Batch #', width: 100 });
        columns.push({
            field: 'placebo', headerName: 'placebo', width: 100,
            // render cell based on the value of each row. row value is either "true" or "false"
            renderCell: renderTrueFalse
        });
            rows.push({
                id: patients[i]._id,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
                batchNumber: patients[i].dosesID,
                currentDosage:dosageString,
                placebo: getBatchNumberPlacebo(patients[i].dosesID),
                eligible: isPatientEligible(patients[i]),
            });
        

    }

    else if (user?.name == 'admin@janehopkins.com' || user?.name == 'doctor@janehopkins.com') {
        //Pushes out the info to the data table.
       
            rows.push({
                patientPicture: patients[i].patientPicture,
                currentDosage:dosageString,
                id: patients[i]._id,
                name: patients[i].name,
                dob: patients[i].dob,
                uuid: patients[i].uuid,
                eligible: isPatientEligible(patients[i]),
            });
        
    }

}




const increaseDosageAmount = async() => {
    const termArray = (patient[0].currentDosage).split("/")
    if(Number(termArray[0]) < Number(termArray[1]) ){
    let number = Number(termArray[0])+1
    const response = await entities.patient.update({
        _id: patient[0].id,
        currentDosage: String(number),
      })
      setCount(count+1)
    }
    else{
        console.log('maxed')
    }
  };
  const decreaseDosageAmount = async() => {
    const termArray = (patient[0].currentDosage).split("/")
    let number = Number(termArray[0])-1
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
                    {(currentUserGlobal == Users.JHDoctor || currentUserGlobal == Users.JHAdmin) && 
                    <><Button
                    disabled={studyStatus == 1}
                    variant="contained"
                    onClick={increaseDosageAmount}
                    sx={{ mx: 2 }}
                >
                    Increase Dosage
                </Button><Button
                    disabled={studyStatus == 1}
                    variant="contained"
                    onClick={decreaseDosageAmount}
                    sx={{ mx: 2 }}
                >
                        Decrease Dosage
                    </Button></>}
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

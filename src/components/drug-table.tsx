import useDrug from "@/api/useDrug";
import useJaneHopkins from "@/api/useJaneHopkins";
import useRefreshKey from "@/api/useRefreshKey";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid"
import React, { useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';


function removePII(columns: GridColDef[]) {
    columns.splice(columns.findIndex(i => i.field == 'placebo'), 1);
}

// Data Table used to display patient info.
function DrugTable() {
    const { entities } = useJaneHopkins();
    const [drugs, setDrugs] = React.useState<any[]>([]);
    const { count, setCount }: any = useRefreshKey();
    const { user } = useUser();

    //Selected Drug
    const { drug, setDrug }: any = useDrug();
    let rows: any[] = [];

    let columns = [
        { field: 'id', headerName: 'ID', width: 300 },
        { field: 'placebo', headerName: 'Placebo', width: 125 },
        { field: 'dosage', headerName: 'Dosage', width: 125 },
        { field: 'batchNumber', headerName: 'Batch Number', width: 300 },

    ];

    useEffect(() => {
        const listDrugs = async () => {
            let drugs = await entities.drug.list();
            setDrugs(drugs.items);
        };
        listDrugs();
    }, [count, user, entities.drug]);

    if (user?.name == 'admin@bavaria.com') {
        // removePII(columns);
        //Pushes out the info to the data table.
        for (let i = 0; i < drugs.length; i++) {
            rows.push({
                id: drugs[i]._id,
                placebo: drugs[i].placebo,
                batchNumber: drugs[i].batchNumber,
                dosage: drugs[i].dosage,

            });
        }
    }
    else if (user?.name == 'admin@fda.com') {
        removePII(columns);
        for (let i = 0; i < drugs.length; i++) {
            rows.push({
                id: drugs[i]._id,
                placebo: drugs[i].placebo,
                batchNumber: drugs[i].batchNumber,
                dosage: drugs[i].dosage,


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
            throw error;
        };
    // Filters through rows to find currently selected athlete
    const onRowsSelectionHandler = (ids: any[]) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        setDrug(selectedRowsData);
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
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
            </div>
        </>
    )
}
export default DrugTable;
import { BatchNumberAPI } from "@/api/BatchNumberAPI";
import useDrug from "@/api/useDrug";
import useJaneHopkins from "@/api/useJaneHopkins";
import useRefreshKey from "@/api/useRefreshKey";
import Users from "@/api/Users";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid"
import React, { useEffect } from "react";

function removePII(columns: GridColDef[]) {
    columns.splice(columns.findIndex(i => i.field == 'placebo'), 1);

}

/**
 * Data Table used to display patient info.
 * Mark rows or columns as editable if necessary. e.g columns={[{ field: 'name', editable: true }]}
 *
 * @param {any[]} rows Rows to display
 * @param {GridColDef[]} columns Columns to display
 * @public
 */
function DrugTable({ currentUser }: { currentUser: Users }) {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = React.useState<any[]>([]);
    const [drugs, setDrugs] = React.useState<any[]>([]);
    const { count, setCount }: any = useRefreshKey();

    //Selected Drug
    const { drug, setDrug }: any = useDrug();
    let rows: any[] = [];

    let columns = [
        { field: 'placebo', headerName: 'Placebo', width: 125 },
        { field: 'batchNumber', headerName: 'Batch Number', width: 300 },
        { field: 'id', headerName: 'ID', width: 300 },
    ];


    useEffect(() => {
        const listDrugs = async () => {
            let drugs = await entities.drug.list();
            console.log("Drug Table");
            console.log(currentUser);
            setDrugs(drugs.items);
        };
        listDrugs();
    }, [count, currentUser, entities.drug]);

    // return true if placebo, false if not placebo
    const getBatchNumberPlacebo = (batchNumber: any) => {
        return drugs.find(drug => drug.batchNumber == batchNumber).placebo;
    }
    if (currentUser == Users.BavariaAdmin) {
        // removePII(columns);
        //Pushes out the info to the data table.
        for (let i = 0; i < drugs.length; i++) {
            rows.push({
                id: drugs[i]._id,
                placebo: drugs[i].placebo,
                batchNumber: drugs[i].batchNumber,

            });
        }
    }
    else if (currentUser == Users.FDAAdmin) {
        removePII(columns);
        for (let i = 0; i < drugs.length; i++) {
            rows.push({
                id: drugs[i]._id,
                batchNumber: drugs[i].batchNumber,

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
    // Filters through rows to find currently selected athlete
    const onRowsSelectionHandler = (ids: any[]) => {
        const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
        console.log(selectedRowsData);
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
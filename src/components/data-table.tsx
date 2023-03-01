import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid"
import React from "react";


/**
 * Data Table used to display patient info.
 * Mark rows or columns as editable if necessary. e.g columns={[{ field: 'name', editable: true }]}
 *
 * @param {any[]} rows Rows to display
 * @param {GridColDef[]} columns Columns to display
 * @public
 */
function DataTable({ rows, columns }: { rows: any[], columns: GridColDef[] }) {

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
        <div className="table" style={{ height: 400, width: '100%' }}>
            <DataGrid
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={processRowUpdateError}
                experimentalFeatures={{ newEditingApi: true }}
                rows={rows}
                columns={columns}
                checkboxSelection
            />
        </div>
    )
}
export default DataTable;

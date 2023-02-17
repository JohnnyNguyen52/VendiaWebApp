import Typography from "@mui/material/Typography"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'age', headerName: 'Age', width: 10 }
]
const rows = [
    { id: 1, name: 'James A', age: 1 },
    { id: 2, name: 'James B', age: 2 },
    { id: 3, name: 'James asdasdasdB', age: 3 },
]
function DataTable() {
    return (
        <div className="table" style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )

}
export default DataTable;
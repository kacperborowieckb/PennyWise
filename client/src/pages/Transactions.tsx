import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'firstName', headerName: 'First name', width: 180 },
  { field: 'lastName', headerName: 'Last name', width: 180 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 140,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 210,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 12, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 22, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 32, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 42, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 52, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 62, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 72, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 82, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 92, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  { id: 123, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 223, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 323, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 423, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 523, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 623, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 723, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 832, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 923, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Transactions = () => {
  return (
    <Box sx={{ margin: '0 auto', maxWidth: '90%', height: '100%', my: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        autoPageSize
        sx={{
          backgroundColor: (theme) => theme.palette.grey[900],
          '& *': { outline: 'none !important' },
        }}
      />
    </Box>
  );
};

export default Transactions;

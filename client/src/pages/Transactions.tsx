import { Box, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectCurrentUserId } from '../features/auth/authSlice';
import { useGetTransactionsQuery } from '../features/transactions/transactionsApiSlice';
import { Categories } from '../helpers/categories';

type Row = {
  id: number;
  category: Categories;
  amount: number;
  createdAt: Date;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'category', headerName: 'Category', width: 180 },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 180,
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    width: 210,
  },
];

const Transactions = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data, isLoading } = useGetTransactionsQuery(uid);
  const rows = data?.ids.map((id) => ({
    id: id,
    category: data.entities[id]?.category,
    amount:
      data.entities[id]?.category === Categories.income
        ? data.entities[id]?.amount
        : (data.entities[id]?.amount as number) * -1,
    createdAt: data.entities[id]?.createdAt,
  })) as Row[];
  return (
    <Box sx={{ margin: '0 auto', maxWidth: '90%', height: '100%', my: 2 }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
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
      )}
    </Box>
  );
};

export default Transactions;

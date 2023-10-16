import { CircularProgress, useColorScheme } from '@mui/material';
import { useGetTransactionsQuery } from '../../features/transactions/transactionsApiSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Categories } from '../../helpers/categories';
import dayjs from 'dayjs';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { selectCurrentUserId } from '../../features/auth/authSlice';

type Row = {
  id: number;
  category: Categories;
  amount: number;
  createdAt: string;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'category', headerName: 'Category', width: 180 },
  {
    field: 'amount',
    headerName: 'Amount',
    width: 180,
  },
  {
    field: 'createdAt',
    headerName: 'Created at',
    width: 200,
  },
];

const TransactionTable = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const { data, isLoading } = useGetTransactionsQuery(uid);
  const { mode } = useColorScheme();
  const rows = data?.ids.map((id) => ({
    id: id,
    category: data.entities[id]?.category,
    amount:
      data.entities[id]?.category === Categories.income
        ? data.entities[id]?.amount
        : (data.entities[id]?.amount as number) * -1,
    createdAt: dayjs(data.entities[id]?.createdAt).format('DD/MM/YYYY HH:mm'),
  })) as Row[];
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          sx={{
            backgroundColor: (theme) =>
              mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
            '& *': { outline: 'none !important' },
          }}
        />
      )}
    </>
  );
};

export default TransactionTable;

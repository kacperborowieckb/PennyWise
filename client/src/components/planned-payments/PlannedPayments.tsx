import {
  Box,
  Checkbox,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import MakePlannedPayments from '../make-planned-payments/MakePlannedPayments';
import noPlannedTransactionsImg from '../../assets/no-planned-transactions-img.svg';
import { useGetPlannedTransactionsQuery } from '../../features/planned-transactions/plannedTransactionsSlice';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUserId } from '../../features/auth/authSlice';

const columns: string[] = ['ID', 'Value', 'Category'];

const PlannedPayments = () => {
  const uid = useAppSelector(selectCurrentUserId);
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const { data, isLoading } = useGetPlannedTransactionsQuery(uid);

  const handleSelectRow = (id: number): void => {
    const selectedRows = [...selected];
    if (selectedRows.indexOf(id) !== -1) {
      selectedRows.splice(selectedRows.indexOf(id), 1);
      setSelected(selectedRows);
    } else {
      setSelected([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selected.length === data?.ids.length) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected([...(data?.ids as number[])]);
      setSelectAll(true);
    }
  };

  const checkIfSelected = (id: number): boolean => selected.indexOf(id) !== -1;

  return (
    <Stack flex={1} spacing={2}>
      <Stack direction={'row'} height={32}>
        <Typography component={'h3'} variant="h6" flexGrow={1}>
          Planned payments:
        </Typography>
        {selected.length > 0 && <MakePlannedPayments />}
      </Stack>
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <CircularProgress />
        </Box>
      )}
      {!isLoading &&
        (data?.ids.length ? (
          <TableContainer component={Paper} sx={{ height: 200, flexGrow: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox checked={selectAll} onChange={handleSelectAll} />
                  </TableCell>
                  {columns.map((column, i) => (
                    <TableCell key={i}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.ids.map((id, i) => {
                  const isSelcted = checkIfSelected(id as number);
                  const handleClick = () => handleSelectRow(id as number);
                  return (
                    <TableRow key={id} hover onClick={handleClick} selected={isSelcted}>
                      <TableCell>
                        <Checkbox checked={isSelcted} onChange={handleClick} />
                      </TableCell>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{data.entities[id]?.amount}</TableCell>
                      <TableCell>{data.entities[id]?.category}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Stack flex={1}>
            <img src={noPlannedTransactionsImg} alt="No planned transactions" height={150} />
            <Typography component={'h3'} variant="h6" mt={2} align="center">
              No planned transactions!
            </Typography>
          </Stack>
        ))}
    </Stack>
  );
};

export default PlannedPayments;

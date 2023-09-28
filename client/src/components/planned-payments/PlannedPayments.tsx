import {
  Checkbox,
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
import { mockTransactions } from '../../helpers/mockTransactions';
import { useState } from 'react';
import MakePlannedPayments from '../make-planned-payments/MakePlannedPayments';
import noPlannedTransactionsImg from '../../assets/no-planned-transactions-img.svg';

const columns: string[] = ['ID', 'Value', 'Category'];

const rows: { [key: string]: any; id: number }[] = [
  ...mockTransactions.map((transaction, i) => ({ id: i + 1, ...transaction })),
];

const PlannedPayments = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

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
    if (selected.length === rows.length) {
      setSelected([]);
      setSelectAll(false);
    } else {
      setSelected([...rows.map((row) => row.id)]);
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
      {rows.length > 0 ? (
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
              {rows.map((row) => {
                const isSelcted = checkIfSelected(row.id);
                const handleClick = () => handleSelectRow(row.id);
                return (
                  <TableRow key={row.id} hover onClick={handleClick} selected={isSelcted}>
                    <TableCell>
                      <Checkbox checked={isSelcted} onChange={handleClick} />
                    </TableCell>
                    {Object.keys(row).map((name, i) => (
                      <TableCell key={i}>{row[name]}</TableCell>
                    ))}
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
      )}
    </Stack>
  );
};

export default PlannedPayments;

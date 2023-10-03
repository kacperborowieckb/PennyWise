import {
  Receipt,
  EmojiPeople,
  LocalGroceryStore,
  Flight,
  LocalHospital,
  AttachMoney,
} from '@mui/icons-material';
import { Categories } from './categories';
import { green } from '@mui/material/colors';

type CategoriesProperiesType = {
  [key: string]: { color: string; icon: JSX.Element };
};

export const categoriesProperties: CategoriesProperiesType = {
  [Categories.bills.toLowerCase()]: { color: '#88524e', icon: <Receipt /> },
  [Categories.personal.toLowerCase()]: { color: '#FD4A21', icon: <EmojiPeople /> },
  [Categories.groceries.toLowerCase()]: { color: '#1DA200', icon: <LocalGroceryStore /> },
  [Categories.travel.toLowerCase()]: { color: '#3EB6ED', icon: <Flight /> },
  [Categories.health.toLowerCase()]: { color: '#f40000', icon: <LocalHospital /> },
  [Categories.income.toLowerCase()]: { color: green[400], icon: <AttachMoney /> },
};

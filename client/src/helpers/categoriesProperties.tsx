import {
  Receipt,
  EmojiPeople,
  LocalGroceryStore,
  Flight,
  LocalHospital,
  AttachMoney,
} from '@mui/icons-material';
import { Categories } from './categories';

type CategoriesProperiesType = {
  [key: string]: { color: string; icon: JSX.Element };
};

export const categoriesProperties: CategoriesProperiesType = {
  [Categories.bills]: { color: '#88524e', icon: <Receipt /> },
  [Categories.personal]: { color: '#FD4A21', icon: <EmojiPeople /> },
  [Categories.groceries]: { color: '#1DA200', icon: <LocalGroceryStore /> },
  [Categories.travel]: { color: '#3EB6ED', icon: <Flight /> },
  [Categories.health]: { color: '#f40000', icon: <LocalHospital /> },
  [Categories.income]: { color: '#f40000', icon: <AttachMoney /> },
};

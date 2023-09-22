import {
  Receipt,
  EmojiPeople,
  LocalGroceryStore,
  Flight,
  LocalHospital,
} from '@mui/icons-material';
import { Categories } from './categories';

export const categoriesProperties = {
  [Categories.bills]: { color: '#88524e', icon: <Receipt /> },
  [Categories.personal]: { color: '#FD4A21', icon: <EmojiPeople /> },
  [Categories.groceries]: { color: '#1DA200', icon: <LocalGroceryStore /> },
  [Categories.travel]: { color: '#3EB6ED', icon: <Flight /> },
  [Categories.health]: { color: '#f40000', icon: <LocalHospital /> },
};

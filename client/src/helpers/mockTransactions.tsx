import { Categories } from './categories';

export const mockTransactions: { value: number; category: string }[] = [
  { value: -110, category: Categories.bills },
  { value: 20, category: Categories.income },
  {
    value: -234.23,
    category: Categories.health,
  },
  { value: -23023.23222, category: Categories.groceries },
  { value: -230, category: Categories.personal },
  { value: -1200.23, category: Categories.travel },
];

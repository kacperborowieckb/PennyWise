import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getCount, increment } from '../../features/counter/counterSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Counter = () => {
  const count = useAppSelector(getCount);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(increment());
  };

  return <Button variant="contained" onClick={handleClick}>{`Count: ${count}`}</Button>;
};

export default Counter;

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useToogle = (
  defaultValue?: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(!!defaultValue);

  const toogle = useCallback(() => {
    setValue((val) => !val);
  }, []);

  return [value, toogle, setValue];
};

import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export const useToggle = (
  defaultValue?: boolean
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(!!defaultValue);

  const Toggle = useCallback(() => {
    setValue((val) => !val);
  }, []);

  return [value, Toggle, setValue];
};

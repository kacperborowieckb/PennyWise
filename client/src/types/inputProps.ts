import { FieldErrors, UseFormRegister } from 'react-hook-form';

export type InputProps = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

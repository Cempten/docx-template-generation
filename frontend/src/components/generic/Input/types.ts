import { UseFormRegister, FieldValues } from 'react-hook-form'

export type InputProps = {
  name: string
  placeholder: string
  register: UseFormRegister<FieldValues>
}

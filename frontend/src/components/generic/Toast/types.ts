import { VariantsEnum } from '@store/notification'

export type ToastProps = {
  onClose: () => void
  message: string | null
} & StyledComponentProps

export type StyledComponentProps = {
  variant: keyof typeof VariantsEnum
}

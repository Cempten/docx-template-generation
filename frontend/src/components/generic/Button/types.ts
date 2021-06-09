export type ButtonProps = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
} & StyledButtonProps

export type StyledButtonProps = {
  width?: string
  margin?: string
}

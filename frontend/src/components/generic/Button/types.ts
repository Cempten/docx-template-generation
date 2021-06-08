export type ButtonProps = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
} & StyledButtonProps

export type StyledButtonProps = {
  width?: string
  margin?: string
}

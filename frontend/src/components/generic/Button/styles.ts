import styled from '@emotion/styled'
// types
import { StyledButtonProps } from './types'

export const StyledButton = styled.button<StyledButtonProps>`
  width: ${({ width }) => (width ? width : '189px')};
  height: 36px;
  margin: ${({ margin }) => (margin ? margin : null)};
  border-radius: 4px;
  background: ${({ theme }) => theme.primary[1]};
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary[5]};
`

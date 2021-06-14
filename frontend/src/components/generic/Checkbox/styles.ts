import styled from '@emotion/styled'
// types
import { CheckboxContainerProps } from './types'

export const CheckboxContainer = styled.div<CheckboxContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: ${({ margin }) => (margin ? margin : null)};
  background: ${({ theme }) => theme.primary[4]};
  border-radius: 8px;
  cursor: pointer;
`

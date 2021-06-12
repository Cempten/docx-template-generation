import styled from '@emotion/styled'
// types
import { VariantsEnum } from '@store/notification'
import { StyledComponentProps } from './types'

export const StyledToastContainer = styled.div<StyledComponentProps>`
  display: flex;
  justify-content: space-between;
  width: 406px;
  min-height: 67px;
  padding: 10px 10px 10px 15px;
  background: ${({ theme, variant }) =>
    variant === VariantsEnum.notification
      ? theme.primary[1]
      : theme.primary[6]};
  border-radius: 8px;
`

export const IconContainer = styled.div<StyledComponentProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin-right: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary[4]};
  color: ${({ theme, variant }) =>
    variant === VariantsEnum.notification
      ? theme.primary[1]
      : theme.primary[6]};
`

export const TextContainer = styled.div`
  margin-right: auto;
  width: 320px;
  font-size: 14px;
  color: ${({ theme }) => theme.primary[4]};
`

export const Title = styled.div`
  font-weight: bold;
`

export const Description = styled.div``

export const CloseButtonContainer = styled.div`
  display: flex;
  font-size: 10px;
  color: ${({ theme }) => theme.primary[4]};
`

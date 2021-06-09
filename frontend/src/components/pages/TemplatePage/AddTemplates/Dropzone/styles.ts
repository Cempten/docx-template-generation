import styled from '@emotion/styled'
// types
import { DivRootProps } from './types'

export const DropzoneRoot = styled.div<DivRootProps>`
  display: flex;
  flex-wrap: wrap;
  width: 492px;
  min-height: 130px;
  margin: ${({ margin }) => (margin ? margin : null)};
  padding: 10px 0 0 10px;
  border: 1px dashed ${({ theme }) => theme.primary[1]};
  border-radius: 8px;
  background: ${({ active, theme }) =>
    active ? theme.primary[2] : theme.primary[3]};
  cursor: pointer;
`

export const File = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 110px;
  width: 110px;
  margin: 0 10px 10px 0;
  padding: 20px 5px;
  border-radius: 8px;
  background: ${({ theme }) => theme.primary[2]};
  font-size: 14px;
  word-break: break-all;
  text-align: center;
`

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`

export const StyledText = styled.p`
  margin: auto;
`

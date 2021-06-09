import styled from '@emotion/styled'

export const StyledInput = styled.input`
  width: 237px;
  height: 32px;
  padding-left: 8px;
  margin: 0 11px 11px 0;
  background: ${({ theme }) => theme.primary[4]};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.primary[1]};
  font-size: 14px;
  font-weight: 500;
  outline: none;

  &:nth-of-type(3n) {
    margin: 0;
  }
`

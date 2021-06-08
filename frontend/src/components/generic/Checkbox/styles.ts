import styled from '@emotion/styled'

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.primary[4]};
  border-radius: 8px;
  cursor: pointer;
`

import styled from '@emotion/styled'

export const TemplatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 9px;
  background: ${({ theme }) => theme.primary[4]};
  border-radius: 8px;
`

export const Template = styled.label`
  display: flex;
  width: 100%;
  padding: 20px 15px 20px 21px;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.primary[2]};
  border-radius: 8px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const DeleteIconWrapper = styled.div`
  margin-left: auto;
`

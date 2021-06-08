import styled from '@emotion/styled'

export const TemplatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 9px;
  background: ${({ theme }) => theme.primary[4]};
  border-radius: 8px;
`

export const StyledTemplate = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 15px 15px 21px;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.primary[2]};
  border-radius: 8px;
  cursor: pointer;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const DeleteIconWrapper = styled.div`
  margin-left: auto;
`

export const TemplatesListPlug = styled.div`
  display: flex;
  justify-content: center;
  width: 470px;
  padding: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.primary[0]};
  text-align: center;
`

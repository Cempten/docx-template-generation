import styled from '@emotion/styled'

export const BaseLayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
`

export const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 798px;
  padding: 25px 32px;
  background: ${({ theme }) => theme.primary[2]};
`

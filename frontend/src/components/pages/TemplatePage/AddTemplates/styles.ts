import styled from '@emotion/styled'

export const AddTemplatesContained = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  background: ${({ theme }) => theme.primary[5]};
  border-radius: 8px;
`

export const Title = styled.div`
  color: ${({ theme }) => theme.primary[0]};
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
`

export const CloseIconWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
`

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
`

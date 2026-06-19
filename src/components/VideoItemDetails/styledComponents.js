import styled from 'styled-components'

export const DetailsContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
`
export const PlayerWrapper = styled.div`
  padding: 20px;
`
export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-weight: bold;
  margin-right: 15px;
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`

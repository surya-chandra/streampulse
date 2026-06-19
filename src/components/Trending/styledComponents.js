import styled from 'styled-components'

export const TrendingContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
`
export const TitleBar = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f1f1f1')};
`

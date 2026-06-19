import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#fafafa')};
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
`

import styled from 'styled-components'

export const GamingContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#0f0f0f' : '#f9f9f9')};
  min-height: 100vh;
`
export const GamingGrid = styled.ul`
  list-style-type: none;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`
export const GamingCard = styled.li`
  width: 22%;
  margin-right: 3%;
  margin-bottom: 30px;
`

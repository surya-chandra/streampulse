import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const NavLinksList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`
export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#0f0f0f')};
  background-color: ${props => {
    if (props.isActive) {
      return props.isDarkTheme ? '#383838' : '#f1f5f9'
    }
    return 'transparent'
  }};
`
export const LinkText = styled.span`
  margin-left: 20px;
  font-weight: ${props => (props.isActive ? 'bold' : 'normal')};
`
export const SidebarFooter = styled.div`
  padding: 20px;
`
export const FooterHeading = styled.p`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#1e293b')};
  font-weight: bold;
`
export const IconsContainer = styled.div`
  display: flex;
  margin: 15px 0px;
`
export const SocialIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 15px;
`
export const FooterText = styled.p`
  color: ${props => (props.isDarkTheme ? '#e2e8f0' : '#475569')};
  font-size: 14px;
`

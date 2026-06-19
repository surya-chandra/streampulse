import styled from 'styled-components'

export const NavHeader = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  height: 60px;
`
export const LogoImage = styled.img`
  width: 120px;
`
export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`
export const ThemeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
  font-size: 24px;
  margin-right: 20px;
`
export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`
export const LogoutButton = styled.button`
  background-color: transparent;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  border: 1px solid ${props => (props.isDarkTheme ? '#ffffff' : '#3b82f6')};
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`
export const PopupContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#212121' : '#ffffff')};
  padding: 30px;
  border-radius: 8px;
  text-align: center;
`
export const PopupText = styled.p`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
  margin-bottom: 20px;
`
export const CancelButton = styled.button`
  background-color: transparent;
  border: 1px solid #7e858e;
  color: #7e858e;
  padding: 10px 20px;
  margin-right: 15px;
  cursor: pointer;
`
export const ConfirmButton = styled.button`
  background-color: #3b82f6;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
`

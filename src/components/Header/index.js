import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaMoon, FaSun} from 'react-icons/fa'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  NavHeader,
  LogoImage,
  ActionsContainer,
  ThemeButton,
  ProfileImage,
  LogoutButton,
  PopupContainer,
  PopupText,
  CancelButton,
  ConfirmButton,
} from './styledComponents'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const logoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <NavHeader isDarkTheme={isDarkTheme}>
            <Link to="/">
              <LogoImage src={logoUrl} alt="website logo" />
            </Link>
            <ActionsContainer>
              <ThemeButton
                data-testid="theme"
                onClick={toggleTheme}
                isDarkTheme={isDarkTheme}
              >
                {isDarkTheme ? <FaSun /> : <FaMoon />}
              </ThemeButton>
              <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
              <Popup
                modal
                trigger={
                  <LogoutButton isDarkTheme={isDarkTheme}>Logout</LogoutButton>
                }
                className="popup-content"
              >
                {close => (
                  <PopupContainer isDarkTheme={isDarkTheme}>
                    <PopupText isDarkTheme={isDarkTheme}>
                      Are you sure, you want to logout?
                    </PopupText>
                    <CancelButton onClick={() => close()}>Cancel</CancelButton>
                    <ConfirmButton onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </PopupContainer>
                )}
              </Popup>
            </ActionsContainer>
          </NavHeader>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Header)

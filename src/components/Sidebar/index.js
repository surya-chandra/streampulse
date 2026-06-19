import {withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {FaGamepad} from 'react-icons/fa'
import {CgList} from 'react-icons/cg'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  SidebarContainer,
  NavLinksList,
  StyledLink,
  LinkText,
  SidebarFooter,
  FooterHeading,
  IconsContainer,
  SocialIcon,
  FooterText,
} from './styledComponents'

const Sidebar = props => {
  const {match} = props
  const {path} = match

  return (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <SidebarContainer isDarkTheme={isDarkTheme}>
            <NavLinksList>
              <li>
                <StyledLink
                  to="/"
                  isActive={path === '/'}
                  isDarkTheme={isDarkTheme}
                >
                  <AiFillHome />
                  <LinkText isActive={path === '/'}>Home</LinkText>
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  to="/trending"
                  isActive={path === '/trending'}
                  isDarkTheme={isDarkTheme}
                >
                  <HiFire />
                  <LinkText isActive={path === '/trending'}>Trending</LinkText>
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  to="/gaming"
                  isActive={path === '/gaming'}
                  isDarkTheme={isDarkTheme}
                >
                  <FaGamepad />
                  <LinkText isActive={path === '/gaming'}>Gaming</LinkText>
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  to="/saved-videos"
                  isActive={path === '/saved-videos'}
                  isDarkTheme={isDarkTheme}
                >
                  <CgList />
                  <LinkText isActive={path === '/saved-videos'}>
                    Saved Videos
                  </LinkText>
                </StyledLink>
              </li>
            </NavLinksList>
            <SidebarFooter isDarkTheme={isDarkTheme}>
              <FooterHeading isDarkTheme={isDarkTheme}>
                CONTACT US
              </FooterHeading>
              <IconsContainer>
                <SocialIcon
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <SocialIcon
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <SocialIcon
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </IconsContainer>
              <FooterText isDarkTheme={isDarkTheme}>
                Enjoy! Now to see your channels and recommendations!
              </FooterText>
            </SidebarFooter>
          </SidebarContainer>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )
}

export default withRouter(Sidebar)

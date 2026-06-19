import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {NotFoundContainer} from './styledComponents'

const NotFound = () => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notFoundImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <NotFoundContainer isDarkTheme={isDarkTheme}>
          <img src={notFoundImg} alt="not found" style={{width: '350px'}} />
          <h1>Page Not Found</h1>
          <p>We are sorry, the page you requested could not be found.</p>
        </NotFoundContainer>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default NotFound

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FaGamepad} from 'react-icons/fa'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {GamingContainer, GamingGrid, GamingCard} from './styledComponents'

class Gaming extends Component {
  state = {videos: [], isLoading: true, isFailure: false}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/videos/gaming', {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({videos: updatedData, isLoading: false, isFailure: false})
    } else {
      this.setState({isLoading: false, isFailure: true})
    }
  }

  render() {
    const {videos, isLoading, isFailure} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const failureImgUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

          return (
            <GamingContainer data-testid="gaming" isDarkTheme={isDarkTheme}>
              <Header />
              <div style={{display: 'flex'}}>
                <Sidebar />
                <div
                  style={{
                    flexGrow: 1,
                    height: 'calc(100vh - 60px)',
                    overflowY: 'auto',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '20px',
                      backgroundColor: isDarkTheme ? '#181818' : '#f1f1f1',
                    }}
                  >
                    <FaGamepad size={40} color="#ff0000" />
                    <h1
                      style={{
                        marginLeft: '15px',
                        color: isDarkTheme ? '#fff' : '#000',
                      }}
                    >
                      Gaming
                    </h1>
                  </div>
                  {isLoading && (
                    <div
                      data-testid="loader"
                      style={{textAlign: 'center', marginTop: '50px'}}
                    >
                      <Loader
                        type="ThreeDots"
                        color="#3b82f6"
                        height={50}
                        width={50}
                      />
                    </div>
                  )}
                  {!isLoading && isFailure && (
                    <div style={{textAlign: 'center'}}>
                      <img
                        src={failureImgUrl}
                        alt="failure view"
                        style={{width: '300px'}}
                      />
                      <div>
                        <button type="button" onClick={this.getTrendingVideos}>
                          Retry
                        </button>
                      </div>
                    </div>
                  )}
                  {!isLoading && !isFailure && (
                    <GamingGrid>
                      {videos.map(each => (
                        <GamingCard key={each.id}>
                          <Link
                            to={`/videos/${each.id}`}
                            style={{textDecoration: 'none', color: 'inherit'}}
                          >
                            <img
                              src={each.thumbnailUrl}
                              alt="video thumbnail"
                              style={{width: '100%'}}
                            />
                            <p style={{fontWeight: 'bold', marginTop: '10px'}}>
                              {each.title}
                            </p>
                            <p style={{color: '#606060'}}>
                              {each.viewCount} Watching Worldwide
                            </p>
                          </Link>
                        </GamingCard>
                      ))}
                    </GamingGrid>
                  )}
                </div>
              </div>
            </GamingContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Gaming

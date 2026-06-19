import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {HiFire} from 'react-icons/hi'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {TrendingContainer, TitleBar} from './styledComponents'

class Trending extends Component {
  state = {videos: [], isLoading: true, isFailure: false}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/videos/trending', {
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
        publishedAt: each.published_at,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
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
            <TrendingContainer data-testid="trending" isDarkTheme={isDarkTheme}>
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
                  <TitleBar isDarkTheme={isDarkTheme}>
                    <HiFire size={40} color="#ff0000" />
                    <h1
                      style={{
                        marginLeft: '15px',
                        color: isDarkTheme ? '#fff' : '#000',
                      }}
                    >
                      Trending
                    </h1>
                  </TitleBar>
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
                      <button type="button" onClick={this.getTrendingVideos}>
                        Retry
                      </button>
                    </div>
                  )}
                  {!isLoading && !isFailure && (
                    <ul style={{listStyleType: 'none', padding: '20px'}}>
                      {videos.map(each => (
                        <li
                          key={each.id}
                          style={{display: 'flex', marginBottom: '20px'}}
                        >
                          <Link
                            to={`/videos/${each.id}`}
                            style={{
                              display: 'flex',
                              textDecoration: 'none',
                              color: 'inherit',
                            }}
                          >
                            <img
                              src={each.thumbnailUrl}
                              alt="video thumbnail"
                              style={{width: '250px', marginRight: '20px'}}
                            />
                            <div>
                              <p style={{fontSize: '18px', fontWeight: 'bold'}}>
                                {each.title}
                              </p>
                              <p>{each.channel.name}</p>
                              {/* Fixed: Render raw publishedAt and views string */}
                              <p>
                                {each.viewCount} views • {each.publishedAt}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </TrendingContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Trending

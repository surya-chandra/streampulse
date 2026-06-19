import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {AiOutlineSearch, AiOutlineClose} from 'react-icons/ai'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  HomeContainer,
  ContentContainer,
  MainArea,
  BannerContainer,
  BannerLeft,
  CloseButton,
  SearchContainer,
  SearchInput,
  SearchButton,
  VideosGrid,
  VideoCard,
  Thumbnail,
  FailureContainer,
  RetryButton,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videos: [],
    searchInput: '',
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
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
      this.setState({
        videos: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div
      className="loader-container"
      data-testid="loader"
      style={{textAlign: 'center', marginTop: '50px'}}
    >
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <ThemeAndVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imgUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <FailureContainer>
            <img src={imgUrl} alt="failure view" style={{width: '300px'}} />
            <h1>Oops! Something Went Wrong</h1>
            <p>
              We are having some trouble completing your request. Please try
              again.
            </p>
            <RetryButton onClick={this.getVideos}>Retry</RetryButton>
          </FailureContainer>
        )
      }}
    </ThemeAndVideoContext.Consumer>
  )

  renderSuccessView = () => {
    const {videos} = this.state
    if (videos.length === 0) {
      return (
        <FailureContainer>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
            alt="no videos"
            style={{width: '300px'}}
          />
          <h1>No Search Results Found</h1>
          <p>Try different key words or remove search filter</p>
          <RetryButton type="button" onClick={this.getVideos}>
            Retry
          </RetryButton>
        </FailureContainer>
      )
    }
    return (
      <VideosGrid>
        {videos.map(each => (
          <VideoCard key={each.id}>
            <Link
              to={`/videos/${each.id}`}
              style={{textDecoration: 'none', color: 'inherit'}}
            >
              <Thumbnail src={each.thumbnailUrl} alt="video thumbnail" />
              <div style={{display: 'flex', marginTop: '10px'}}>
                <img
                  src={each.channel.profileImageUrl}
                  alt="channel logo"
                  style={{width: '40px', height: '40px', marginRight: '10px'}}
                />
                <div>
                  <p style={{fontSize: '14px', margin: '0 0 5px 0'}}>
                    {each.title}
                  </p>
                  <p style={{fontSize: '12px', color: '#606060', margin: '0'}}>
                    {each.channel.name}
                  </p>
                  <p style={{fontSize: '12px', color: '#606060', margin: '0'}}>
                    {each.viewCount} views • {each.publishedAt}
                  </p>
                </div>
              </div>
            </Link>
          </VideoCard>
        ))}
      </VideosGrid>
    )
  }

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, showBanner} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <HomeContainer data-testid="home" isDarkTheme={isDarkTheme}>
              <Header />
              <ContentContainer>
                <Sidebar />
                <MainArea>
                  {showBanner && (
                    <BannerContainer data-testid="banner">
                      <BannerLeft>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          style={{width: '120px'}}
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button
                          type="button"
                          style={{
                            padding: '10px',
                            background: 'transparent',
                            border: '1px solid #000',
                          }}
                        >
                          GET IT NOW
                        </button>
                      </BannerLeft>
                      <CloseButton
                        data-testid="close"
                        onClick={() => this.setState({showBanner: false})}
                      >
                        <AiOutlineClose size={20} />
                      </CloseButton>
                    </BannerContainer>
                  )}
                  <SearchContainer>
                    <SearchInput
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={e =>
                        this.setState({searchInput: e.target.value})
                      }
                      isDarkTheme={isDarkTheme}
                    />
                    <SearchButton
                      data-testid="searchButton"
                      onClick={this.getVideos}
                      isDarkTheme={isDarkTheme}
                    >
                      <AiOutlineSearch />
                    </SearchButton>
                  </SearchContainer>
                  {this.renderAllViews()}
                </MainArea>
              </ContentContainer>
            </HomeContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Home

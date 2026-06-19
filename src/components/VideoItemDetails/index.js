import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {CgList} from 'react-icons/cg'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {DetailsContainer, PlayerWrapper, ActionButton} from './styledComponents'

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    isLoading: true,
    isFailure: false,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch(`https://apis.ccbp.in/videos/${id}`, {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    })
    if (response.ok) {
      const data = await response.json()
      const val = data.video_details
      const updated = {
        id: val.id,
        title: val.title,
        videoUrl: val.video_url,
        thumbnailUrl: val.thumbnail_url,
        viewCount: val.view_count,
        publishedAt: val.published_at,
        description: val.description,
        channel: {
          name: val.channel.name,
          profileImageUrl: val.channel.profile_image_url,
          subscriberCount: val.channel.subscriber_count,
        },
      }
      this.setState({videoDetails: updated, isLoading: false})
    } else {
      this.setState({isLoading: false, isFailure: true})
    }
  }

  clickLike = () =>
    this.setState(prev => ({isLiked: !prev.isLiked, isDisliked: false}))

  clickDislike = () =>
    this.setState(prev => ({isDisliked: !prev.isDisliked, isLiked: false}))

  render() {
    const {videoDetails, isLoading, isFailure, isLiked, isDisliked} = this.state
    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme, savedVideos, addVideo, removeVideo} = value
          const isSaved = savedVideos.some(each => each.id === videoDetails.id)

          const onClickSaveButton = () => {
            if (isSaved) {
              removeVideo(videoDetails.id)
            } else {
              addVideo(videoDetails)
            }
          }

          return (
            <DetailsContainer
              data-testid="videoItemDetails"
              isDarkTheme={isDarkTheme}
            >
              <Header />
              <div style={{display: 'flex'}}>
                <Sidebar />
                <div style={{flexGrow: 1, padding: '20px'}}>
                  {isLoading && (
                    <div data-testid="loader" style={{textAlign: 'center'}}>
                      <Loader
                        type="ThreeDots"
                        color="#3b82f6"
                        height={50}
                        width={50}
                      />
                    </div>
                  )}
                  {!isLoading && isFailure && (
                    <div>
                      <button type="button" onClick={this.getVideoDetails}>
                        Retry
                      </button>
                    </div>
                  )}
                  {!isLoading && !isFailure && (
                    <PlayerWrapper>
                      <ReactPlayer
                        url={videoDetails.videoUrl}
                        controls
                        width="100%"
                        height="450px"
                      />
                      <p
                        style={{
                          fontSize: '20px',
                          marginTop: '15px',
                          color: isDarkTheme ? '#fff' : '#000',
                        }}
                      >
                        {videoDetails.title}
                      </p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: '#64748b',
                        }}
                      >
                        <p>
                          {videoDetails.viewCount} views •{' '}
                          {videoDetails.publishedAt}
                        </p>
                        <div>
                          <ActionButton
                            isActive={isLiked}
                            onClick={this.clickLike}
                          >
                            <AiOutlineLike size={20} /> Like
                          </ActionButton>
                          <ActionButton
                            isActive={isDisliked}
                            onClick={this.clickDislike}
                          >
                            <AiOutlineDislike size={20} /> Dislike
                          </ActionButton>
                          <ActionButton
                            isActive={isSaved}
                            onClick={onClickSaveButton}
                          >
                            <CgList size={20} /> {isSaved ? 'Saved' : 'Save'}
                          </ActionButton>
                        </div>
                      </div>
                      <hr
                        style={{border: '1px solid #64748b', margin: '20px 0'}}
                      />
                      <div style={{display: 'flex'}}>
                        <img
                          src={videoDetails.channel.profileImageUrl}
                          alt="channel logo"
                          style={{
                            width: '50px',
                            height: '50px',
                            marginRight: '15px',
                          }}
                        />
                        <div>
                          <p
                            style={{
                              fontWeight: 'bold',
                              margin: 0,
                              color: isDarkTheme ? '#fff' : '#000',
                            }}
                          >
                            {videoDetails.channel.name}
                          </p>
                          <p style={{fontSize: '12px', color: '#64748b'}}>
                            {videoDetails.channel.subscriberCount} subscribers
                          </p>
                          <p
                            style={{
                              marginTop: '15px',
                              color: isDarkTheme ? '#fff' : '#000',
                            }}
                          >
                            {videoDetails.description}
                          </p>
                        </div>
                      </div>
                    </PlayerWrapper>
                  )}
                </div>
              </div>
            </DetailsContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default VideoItemDetails

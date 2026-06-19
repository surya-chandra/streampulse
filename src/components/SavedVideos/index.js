import {Link} from 'react-router-dom'
import {CgList} from 'react-icons/cg'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {SavedContainer} from './styledComponents'

const SavedVideos = () => (
  <ThemeAndVideoContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideos} = value
      return (
        <SavedContainer data-testid="savedVideos" isDarkTheme={isDarkTheme}>
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
              {/* Added the required title banner layout block */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '20px',
                  backgroundColor: isDarkTheme ? '#181818' : '#f1f1f1',
                }}
              >
                <CgList size={40} color="#ff0000" />
                <h1
                  style={{
                    marginLeft: '15px',
                    color: isDarkTheme ? '#fff' : '#000',
                  }}
                >
                  Saved Videos
                </h1>
              </div>

              {savedVideos.length === 0 ? (
                <div style={{textAlign: 'center', padding: '40px'}}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    style={{width: '300px'}}
                  />
                  <h1>No saved videos found</h1>
                  <p>You can save your videos while watching them</p>
                </div>
              ) : (
                <ul style={{listStyleType: 'none', padding: '20px'}}>
                  {savedVideos.map(each => (
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
                          <p
                            style={{
                              fontSize: '18px',
                              fontWeight: 'bold',
                              color: isDarkTheme ? '#fff' : '#000',
                            }}
                          >
                            {each.title}
                          </p>
                          <p style={{color: '#64748b'}}>{each.channel.name}</p>
                          {/* Fixed publishedAt string match requirement */}
                          <p style={{color: '#64748b'}}>
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
        </SavedContainer>
      )
    }}
  </ThemeAndVideoContext.Consumer>
)

export default SavedVideos

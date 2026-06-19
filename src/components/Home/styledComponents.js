import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
  min-height: 100vh;
`
export const ContentContainer = styled.div`
  display: flex;
`
export const MainArea = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  height: calc(100vh - 60px);
`
export const BannerContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 30px;
  display: flex; 
  justify-content: space-between;
`
export const BannerLeft = styled.div`
  max-width: 400px;
`
export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  align-self: flex-start;
`
export const SearchContainer = styled.div`
  display: flex;
  margin: 20px;
  max-width: 500px;
  border: 1px solid #cbd5e1;
`
export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: transparent;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
  outline: none;
`
export const SearchButton = styled.button.attrs({type: 'button'})`
  padding: 10px 20px;
  background-color: ${props => (props.isDarkTheme ? '#313131' : '#f4f4f4')};
  border: none;
  border-left: 1px solid #cbd5e1;
  cursor: pointer;
  color: #606060;
`
export const VideosGrid = styled.ul`
  list-style-type: none;
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
`
export const VideoCard = styled.li`
  width: 30%;
  margin-right: 3%;
  margin-bottom: 30px;
`
export const Thumbnail = styled.img`
  width: 100%;
`
export const FailureContainer = styled.div`
  text-align: center;
  padding: 5px;
`
export const RetryButton = styled.button`
  background-color: #4f46e5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`

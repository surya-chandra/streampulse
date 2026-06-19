import React from 'react'

const ThemeAndVideoContext = React.createContext({
  isDarkTheme: false,
  savedVideos: [],
  toggleTheme: () => {},
  addVideo: () => {},
  removeVideo: () => {},
})

export default ThemeAndVideoContext

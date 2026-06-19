import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ThemeAndVideoContext from '../../context/ThemeAndVideoContext'
import {
  LoginContainer,
  FormContainer,
  Logo,
  InputContainer,
  Label,
  Input,
  CheckboxContainer,
  Checkbox,
  LoginButton,
  ErrorMsg,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  toggleShowPassword = () =>
    this.setState(prev => ({showPassword: !prev.showPassword}))

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showPassword, showSubmitError, errorMsg} =
      this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeAndVideoContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const logoUrl = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <LoginContainer isDarkTheme={isDarkTheme}>
              <FormContainer
                onSubmit={this.submitForm}
                isDarkTheme={isDarkTheme}
              >
                <Logo src={logoUrl} alt="website logo" />
                <InputContainer>
                  <Label htmlFor="username" isDarkTheme={isDarkTheme}>
                    USERNAME
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={this.onChangeUsername}
                    isDarkTheme={isDarkTheme}
                    placeholder="Username"
                  />
                </InputContainer>
                <InputContainer>
                  <Label htmlFor="password" isDarkTheme={isDarkTheme}>
                    PASSWORD
                  </Label>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    isDarkTheme={isDarkTheme}
                    placeholder="Password"
                  />
                </InputContainer>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={this.toggleShowPassword}
                  />
                  <Label htmlFor="showPassword" isDarkTheme={isDarkTheme}>
                    Show Password
                  </Label>
                </CheckboxContainer>
                <LoginButton type="submit">Login</LoginButton>
                {showSubmitError && <ErrorMsg>*{errorMsg}</ErrorMsg>}
              </FormContainer>
            </LoginContainer>
          )
        }}
      </ThemeAndVideoContext.Consumer>
    )
  }
}

export default Login

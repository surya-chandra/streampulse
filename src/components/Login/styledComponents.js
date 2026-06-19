import styled from 'styled-components'

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => (props.isDarkTheme ? '#181818' : '#f9f9f9')};
`
export const FormContainer = styled.form`
  background-color: ${props => (props.isDarkTheme ? '#000000' : '#ffffff')};
  padding: 40px;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`
export const Logo = styled.img`
  width: 150px;
  display: block;
  margin: 0 auto 30px auto;
`
export const InputContainer = styled.div`
  margin-bottom: 20px;
`
export const Label = styled.label`
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#475569')};
  font-size: 12px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #cbd5e1;
  background-color: transparent;
  color: ${props => (props.isDarkTheme ? '#ffffff' : '#000000')};
  border-radius: 4px;
`
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
export const Checkbox = styled.input`
  margin-right: 8px;
`
export const LoginButton = styled.button`
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`
export const ErrorMsg = styled.p`
  color: #ff0b37;
  font-size: 12px;
  margin-top: 5px;
`

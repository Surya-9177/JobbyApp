import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      showErrMsg: true,
      errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = ' https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showErrMsg, errorMsg} = this.state
    return (
      <div className="login-con">
        <form onSubmit={this.onSubmitForm}>
          <div className="form-con">
            <img
              className="web-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
            <br />
            <label htmlFor="userName" className="label">
              USERNAME
            </label>
            <br />
            <input
              className="input"
              onChange={this.onChangeUsername}
              value={username}
              type="text"
              placeholder="Username"
              id="userName"
            />
            <br />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <br />
            <input
              className="input"
              onChange={this.onChangePassword}
              id="password"
              value={password}
              type="password"
              placeholder="Password"
            />
            <br />
            <button className="btn" type="submit">
              Login
            </button>
            {showErrMsg && <p className="p1">*{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}
export default Login

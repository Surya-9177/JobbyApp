import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-con">
      <div className="nav-header">
        <div>
          <Link to="/">
            <li>
              <img
                className="web-logo1"
                alt="website logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              />
            </li>
          </Link>
        </div>
        <div className="link-con">
          <Link className="link" to="/">
            <li>Home</li>
          </Link>
          <Link className="link" to="/jobs">
            <li>Jobs</li>
          </Link>
        </div>
        <li>
          <button type="button" onClick={onClickLogout} className="btn1">
            Logout
          </button>
        </li>
      </div>
    </nav>
  )
}
export default withRouter(Header)

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'
import {FaHome} from 'react-icons/fa'
import {FaSuitcase} from 'react-icons/fa'
import {IoLogOutOutline} from 'react-icons/io5'

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

        <Link className="link" to="/">
          <li className="header-home-text">Home</li>
          <li>
            <FaHome className="header-home-icon" />
          </li>
        </Link>
        <Link className="link" to="/jobs">
          <li className="header-home-text">Jobs</li>
          <li className="header-home-icon">
            <FaSuitcase />
          </li>
        </Link>
        <li>
          <IoLogOutOutline
            className="header-home-icon i1"
            type="button"
            onClick={onClickLogout}
          />
        </li>

        <li>
          <button
            className="header-home-text btn1"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </div>
    </nav>
  )
}
export default withRouter(Header)

import './index.css'
import Header from '../Header'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-con">
      <Header />
      <div className="home-con1">
        <h1 className="home-head">
          Find The Job That <br /> Fits Your Life
        </h1>
        <p className="home-des">
          Millions of people are searching for jobs, salary ....
        </p>
        <Link className="link" to="/jobs">
          <button type="button" className="btn1">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home

import './index.css'
import {Component} from 'react'
import Header from '../Header'
import Cookies from 'js-cookie'
import JobsCard from '../JobsCard'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileInfo: [],
    searchInput: '',
    employmentType: [],
    minPackage: '1000000',
    isProfileLoading: true,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    console.log('called')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentType, minPackage} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minPackage}=&search=${searchInput}`
    const profileUrl = `https://apis.ccbp.in/profile`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseForProfile = await fetch(profileUrl, options)
    if (responseForProfile.ok === true) {
      const dataOfProfile = await responseForProfile.json()

      const profile = dataOfProfile.profile_details
      const updatedProfileData = {
        name: profile.name,
        profileImgUrl: profile.profile_image_url,
        shortBio: profile.short_bio,
      }
      this.setState({
        profileInfo: updatedProfileData,
        isProfileLoading: false,
      })
    }

    const responseForJobs = await fetch(jobsApiUrl, options)
    if (responseForJobs.ok === true) {
      const dataOfJobsList = await responseForJobs.json()

      const updatedJobsData = dataOfJobsList.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnom: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (responseForJobs.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-con">
      <img
        className="fail-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.retryAgain}>
        Retry
      </button>
    </div>
  )

  retryAgain = () => {
    this.setState(
      {
        jobsList: [],
        profileInfo: [],
        searchInput: '',
        employmentType: [],
        minPackage: '1000000',
        isProfileLoading: true,
        apiStatus: apiStatusConstants.initial,
      },
      this.getJobsData,
    )
  }

  renderProfile = () => {
    const {profileInfo, isProfileLoading} = this.state
    const {name, profileImgUrl, shortBio} = profileInfo

    return isProfileLoading ? (
      <div className="loader" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    ) : (
      <li className="profile-con">
        <img alt="profile" src={profileImgUrl} className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </li>
    )
  }

  eventHandler1 = event => {
    this.setState({employmentType: event.target.value}, this.getJobsData)
  }

  eventHandler2 = event => {
    if (event.target.checked) {
      this.setState({minPackage: event.target.value}, this.getJobsData)
    }
  }

  renderJobsSelectionThings = () => {
    return (
      <ul>
        <li>
          <h1>Type of Employment</h1>
          {employmentTypesList.map(each => (
            <div key={each.employmentTypeId}>
              <input
                onClick={this.eventHandler1}
                id={each.employmentTypeId}
                type="checkbox"
                value={each.employmentTypeId}
              />
              <label htmlFor={each.employmentTypeId}>{each.label}</label>
              <br />
            </div>
          ))}
        </li>

        <hr />
        <li>
          <h1>Salary Range</h1>
          {salaryRangesList.map(each => (
            <div key={each.salaryRangeId}>
              <input
                onClick={this.eventHandler2}
                id={each.salaryRangeId}
                type="radio"
                value={each.salaryRangeId}
                name="salaryRange"
              />
              <label htmlFor={each.salaryRangeId}>{each.label}</label>
              <br />
            </div>
          ))}
          <br />
        </li>
      </ul>
    )
  }

  getSearchData = event => {
    this.setState({searchInput: event.target.value.toLowerCase()})
  }

  renderJobsList = () => {
    const {jobsList, searchInput, title} = this.state

    return (
      <li className="job-card-main-con">
        <ul className="ip-con">
          <input
            onChange={this.getSearchData}
            placeholder="Search"
            type="search"
          />
          <button
            onClick={this.getJobsData}
            className="search-btn"
            data-testid="searchButton"
            type="button"
          >
            <BsSearch />
          </button>
        </ul>
        {jobsList.map(each => (
          <JobsCard jobDetails={each} key={each.id} />
        ))}
      </li>
    )
  }

  renderSuccessView = () => {
    const {jobsList} = this.state
    return (
      <div className="jobs-con1">
        <Header />
        <div className="jobs-con2">
          <ul>
            {this.renderProfile()}
            <hr />
            {this.renderJobsSelectionThings()}
          </ul>
          <ul>{this.renderJobsList()}</ul>
        </div>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}
export default Jobs

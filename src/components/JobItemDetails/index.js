import './index.css'
import Header from '../Header'
import {Component} from 'react'
import JobItem from '../JobItem'
import Cookies from 'js-cookie'
import SkillsItem from '../SkillsItem'
import {v4} from 'uuid'
import SimilarJobItem from '../SimilarJobItem'
import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsList: [],
    similarJobsList: [],
    skillsList: [],
    companyDetailsList: [],
    apiStatus: apiStatusConstants.initial,
  }
  componentDidMount() {
    this.getJobItemDetails()
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
        jobItemDetailsList: [],
        similarJobsList: [],
        skillsList: [],
        companyDetailsList: [],
        apiStatus: apiStatusConstants.initial,
      },
      this.getJobItemDetails,
    )
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const jobItemUrl = ` https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobItemUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const each = data.job_details

      const updatedJobDetails1 = {
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        companyWebsiteUrl: each.company_website_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnom: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }
      this.setState({
        jobItemDetailsList: updatedJobDetails1,
      })

      const each2 = data.job_details.skills

      const updatedJobDetails2 = each2.map(item => ({
        id: v4(),
        name: item.name,
        skillsImageUrl: item.image_url,
      }))
      this.setState({
        skillsList: updatedJobDetails2,
      })

      const each3 = data.job_details.life_at_company
      const updatedJobDetails3 = {
        lifeAtComImgUrl: each3.image_url,
        description: each3.description,
      }
      this.setState({
        companyDetailsList: updatedJobDetails3,
      })

      const updatedSimilarJobs = data.similar_jobs.map(i => ({
        companyLogoUrl: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        rating: i.rating,
        title: i.title,
      }))
      this.setState({
        similarJobsList: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLifeAtCompany = () => {
    const {companyDetailsList} = this.state
    const {lifeAtComImgUrl, description} = companyDetailsList

    return (
      <li className="life-at-com-con">
        <div>
          <h1>life at Company</h1>
          <p>{description}</p>
        </div>
        <img src={lifeAtComImgUrl} alt="life at company" />
      </li>
    )
  }

  renderSuccessView = () => {
    const {jobItemDetailsList, skillsList, similarJobsList} = this.state
    return (
      <div className="job-item-details-con">
        <Header />
        <ul>
          {
            <JobItem
              jobItemDetails={jobItemDetailsList}
              key={jobItemDetailsList.id}
            />
          }
        </ul>
        <ul className="skill-ul-con">
          <h1>Skills</h1>
          {skillsList.map(each => (
            <SkillsItem skillsListDetails={each} key={each.id} />
          ))}
        </ul>
        <ul>{this.renderLifeAtCompany()}</ul>
        <h1>Similar Jobs</h1>
        <ul className="similar-con">
          {similarJobsList.map(each => (
            <SimilarJobItem similarJobDet={each} key={each.id} />
          ))}
        </ul>
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

export default JobItemDetails

/**/

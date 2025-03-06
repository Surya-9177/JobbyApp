import './index.css'
import {Link} from 'react-router-dom'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnom,
    title,
    rating,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="jobs">
      <div className="job-card-con">
        <div className="job-card-con1">
          <img alt = "company logo" src={companyLogoUrl} className="job-card-logo" />
          <div className="job-card-initial1">
            <h1 className="job-card-head">{title}</h1>
            <p className="job-card-rating">rating {rating}</p>
          </div>
        </div>
        <div className="job-card-con2">
          <p className="p2">{location}</p>
          <p>{employmentType}</p>
          <p className="p2">{packagePerAnom}</p>
        </div>
        <hr />
        <h1 className="job-card-head">Description</h1>
        <p>{jobDescription}</p>
      </div>
    </Link>
  )
}
export default JobsCard

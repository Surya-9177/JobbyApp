import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnom,
    rating,
    title,
  } = jobItemDetails
  return (
    <li>
      <div className="job-card-con">
        <div className="job-card-con1">
          <img
            alt="job details company logo"
            src={companyLogoUrl}
            className="job-card-logo"
          />
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

        <a href={companyWebsiteUrl}>Visit</a>
      </div>
    </li>
  )
}
export default JobItem

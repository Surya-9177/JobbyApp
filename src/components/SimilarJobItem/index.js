import './index.css'

const SimilarJobItem = props => {
  const {similarJobDet} = props
  const {
    id,
    title,
    location,
    rating,
    jobDescription,
    employmentType,
    companyLogoUrl,
  } = similarJobDet
  return (
    <li className="similar-job-con">
      <div className="conn1">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-img"
        />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="conn1">
        <p>{location}</p>
        <p>{employmentType}</p>
      </div>
    </li>
  )
}
export default SimilarJobItem

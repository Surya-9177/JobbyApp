import './index.css'

const SkillsItem = props => {
  const {skillsListDetails} = props
  const {name, skillsImageUrl} = skillsListDetails

  return (
    <li className="skill-con">
      <img className="skill-img" src={skillsImageUrl} alt={name} />
      <p className="skill-name">{name}</p>
    </li>
  )
}
export default SkillsItem

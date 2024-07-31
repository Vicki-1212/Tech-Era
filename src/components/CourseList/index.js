import {Link} from 'react-router-dom'
import './index.css'

const CourseList = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <Link className="navlink" to={`/courses/${id}`}>
      <li className="course-list-item">
        <img src={logoUrl} alt={name} className="home-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseList

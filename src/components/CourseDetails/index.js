import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const statusView = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseDetails extends Component {
  state = {courseDetailsList: {}, status: statusView.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({status: statusView.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        id: data.course_details.id,
        name: data.course_details.name,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
      }
      console.log(formattedData)
      this.setState({
        courseDetailsList: formattedData,
        status: statusView.success,
      })
    } else {
      this.setState({status: statusView.failure})
    }
  }

  onClickRetryButton = () => {
    this.getCourseDetails()
  }

  renderLoadingView = () => (
    <div className="course-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetailsList} = this.state
    const {name, description, imageUrl} = courseDetailsList
    return (
      <div className="courseDetails-container">
        <div className="course-info">
          <img src={imageUrl} alt={name} className="course-image" />
          <div className="course-description-container">
            <h1 className="courseDetails-heading">{name}</h1>
            <p className="courseDetails-description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="course-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="course-failure-image"
      />
      <h1 className="course-failure-heading">Oops! Something Went Wrong</h1>
      <p className="course-failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="course-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderCourseApiStatusView = () => {
    const {status} = this.state
    switch (status) {
      case statusView.success:
        return this.renderSuccessView()
      case statusView.failure:
        return this.renderFailureView()
      case statusView.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderCourseApiStatusView()}
      </>
    )
  }
}

export default CourseDetails

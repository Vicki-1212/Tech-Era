import {Component} from 'react'

import Loader from 'react-loader-spinner'
import CourseList from '../CourseList'
import Header from '../Header'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstant.initial, courseList: []}

  componentDidMount() {
    this.getApiCall()
  }

  getApiCall = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courseList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickButton = () => {
    this.getApiCall()
  }

  renderLoadingView = () => (
    <div className="home-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="home-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="home-failure-image"
      />
      <h1 className="home-failure-heading">Oops! Something Went Wrong</h1>
      <p className="home-failure-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="home-button"
        onClick={this.onClickButton}
      >
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="home-container">
        <h1 className="home-heading">Courses</h1>
        <ul className="courseList-container">
          {courseList.map(eachCourse => (
            <CourseList key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiStatusview = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderApiStatusview()}
      </>
    )
  }
}

export default Home

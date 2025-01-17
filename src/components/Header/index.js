import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-container">
    <Link className="header-nav-link" to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="logo"
      />
    </Link>
  </div>
)

export default withRouter(Header)

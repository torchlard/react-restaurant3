import React from 'react'
import { Link, withRouter} from 'react-router-dom'

const Header = (props) => (
  <div>
    <button><Link to="/home">Home</Link></button>
      {props.title}
    { withRouter(({history}) => 
      <button onClick={() => {
        props.signout();
        history.push("/")
      }}> Logout </button>
    )}
  </div>
)

export default Header















import React from 'react'
import { Link, withRouter} from 'react-router-dom'

const Header = (props) => (
  <div>
    { withRouter(({history}) => 
      <button onClick={() => {
        props.signout();
        history.push("/")
      }}> Logout </button>
    )}
    
    <button><Link to="/home">Home</Link></button>
      {props.title}
  </div>
)

export default Header















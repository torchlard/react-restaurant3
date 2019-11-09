import React from 'react'
import { Link, withRouter} from 'react-router-dom';

// const Header = (props) => (
//   <div>
//     { withRouter(({history}) => 
//       <button onClick={() => {
//         props.signout();
//         history.push("/")
//       }}> Logout </button>
//     )}

//     <button><Link to="/home">Home</Link></button>
//       {props.title}
//   </div>
// )

const Header = (props) => {

  const Gohome = withRouter(({history}) => 
      <button onClick={() => {
        props.signout(); history.push("/")
      }}> Logout </button> )

  return (
    <div>
      {/* <Gohome /> */}
      <span> {props.title} </span>  
      <button><Link to="/home">Home</Link></button>
    </div>
  )
}


export default Header















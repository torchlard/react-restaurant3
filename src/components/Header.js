import React, {useContext} from 'react'
import { Link} from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';
import { ACCOUNT_SIGNOUT } from '../constants/actionTypes';



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

const Header = () => {
  const {state, dispatch} = useContext(GlobalContext)

  // const Gohome = withRouter(({history}) => 
  //     <button onClick={() => {
  //       props.signout(); history.push("/")
  //     }}> Logout </button> )

  return (
    <div>
      {/* <Gohome /> */}
      <button id="logout" onClick={() => dispatch(ACCOUNT_SIGNOUT)}>Logout</button>
      <span> {state.current.title} </span>  
      <button><Link to="/home">Home</Link></button>
    </div>
  )
}


export default Header















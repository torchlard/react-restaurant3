import React, {useContext} from 'react'
import { Link} from 'react-router-dom';
import { GlobalContext } from '../GlobalContext';

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
  const {state} = useContext(GlobalContext)

  // const Gohome = withRouter(({history}) => 
  //     <button onClick={() => {
  //       props.signout(); history.push("/")
  //     }}> Logout </button> )

  return (
    <div>
      {/* <Gohome /> */}
      <span> {state.current.title} </span>  
      <button><Link to="/home">Home</Link></button>
    </div>
  )
}


export default Header















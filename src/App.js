import React, {useState} from 'react';
// import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App = () => {
  const [role, changeRole] = useState('')
  const [username, changeName] = useState('')
  const [password, changePassword] = useState('')
  const [isAuthenticated, changeAuth] = useState(false)

  const signin = () => {
    if(role === 'admin'){
      changeAuth(true); changeRole('admin')
      return true;
    } else if (username === 'worker'){
      changeAuth(false); changeRole('worker')
      return true
    } else {
      changeAuth(false); changeRole('')
      return false
    }
  }

  const signout = () => {
    changeAuth(false); changeRole('')
    changeName(''); changePassword('')
  }

  return (
    <div>{}</div>
  )
}

export default App;

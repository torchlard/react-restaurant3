import React from 'react'

const Home = (props) => {
  if(props.account.role === 'admin'){
    return <h1>home land admin</h1>
  } else {
    return <h1>other people's home</h1>
  }
  
}

export default Home










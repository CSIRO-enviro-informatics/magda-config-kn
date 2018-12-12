import React from 'react'
import './App.css'
import NavBar from './NavBar'
import NavMainContent from './NavMainContent'
import Footer from './Footer'

const App = (props) =>  {
  return (
    <div className="">
      <NavBar/>
      <NavMainContent />
      <Footer />
    </div>
  );
}

export default App;

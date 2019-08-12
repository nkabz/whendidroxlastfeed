import React from 'react';
import './App.scss';
import Navbar from './components/Layout/Navbar/Navbar';
import Feed from './containers/Feed/Feed';

function App() {
  return (
    <React.Fragment> 
      <Navbar />
      <Feed />
    </React.Fragment>
  );
}

export default App;

import React from 'react';
import './App.css';
import CarForm from './components/CarForm';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <CarForm/>
    </div>
  );
}

export default App;

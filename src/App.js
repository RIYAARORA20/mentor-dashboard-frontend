import './App.css';
import Table from './components/StudentTable';
import Evaluation from './components/Evaluation';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('data.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => response.json())
      .then((myjson) => {
        setData(myjson);
      })
  }, []);

  
  return (
    <div>
      <BrowserRouter>

      <Routes>
        <Route path="/" element={<Table/>}/>
        <Route path="/edit" element={<Evaluation/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

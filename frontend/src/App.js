import './App.css';
import React, { useState } from 'react';
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import Sidebar from './components/Sidebar.jsx';


function App() {

  const [content, setContent] = useState("");
  const [ inputText, setInputText ] = useState("");
  const [ info, setInfo ] = useState([])
 

  return (
    <div className="App">
      <div style={{width:"100%",display:"flex", flexDirection:"row"}}>
          <Sidebar setInputText={setInputText} info={info} />
          <MapChart setTooltipContent={setContent} inputText={inputText} setInfo={setInfo} />
          <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
}

export default App;

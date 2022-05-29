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
      
      {/* old codes */}
      <div style={{width:"100%",display:"flex", flexDirection:"row"}}>
          <Sidebar inputText={inputText} setInputText={setInputText} info={info} />
          <MapChart setTooltipContent={setContent} inputText={inputText} setInfo={setInfo} info={info} />
          <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
}

export default App;

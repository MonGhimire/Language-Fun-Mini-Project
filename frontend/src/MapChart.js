import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
// import axios from 'axios'



const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

function talkWithBackendNow(inputText,name,setInfo){

    const data = {
      "input": inputText,
      "country": name
    }
    try {

        if(!data.input || !data.country){
          return;
        }

        fetch("http://localhost:9000/api/translate",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(response => response.json())
          .then(data => {
            
            setInfo(data);})
        } catch (error) {
          alert("try again later")
      }
}

function color(countriesArr, name){
  console.log(countriesArr);
  console.log(name);
  return countriesArr[0]===name ? 
  "red" : 
  (countriesArr.find((element)=>element===name) ? "skyBlue" : "#D6D6DA");
}

const MapChart = ({ setTooltipContent, inputText, setInfo, info }) => {


    let countriesArr = info.map(item=>item.country)


    return (
    <div style={{width:"70%",height:"50%", paddingTop:"0px"}}> 
  
      <ComposableMap data-tip="" projectionConfig={{ scale: 180 }}>
        {/* <ZoomableGroup> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (

                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={color(countriesArr,geo.properties.NAME)}  
                  onClick={() => {
                    console.log(inputText);
                    console.log(geo.properties);
                    const { NAME, POP_EST } = geo.properties;
                    talkWithBackendNow(inputText,NAME,setInfo)
                
                  }}
                  onMouseEnter={()=>{
                    setTooltipContent(`${geo.properties.NAME}`);
                  }}

                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      outline: "none"
                    },
                    hover: {
                      fill: "#15c39a",
                      outline: "none"
                    },
                    pressed: {
                      
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        {/* </ZoomableGroup> */}
      </ComposableMap>
     
    </div>
  );
};

export default memo(MapChart);

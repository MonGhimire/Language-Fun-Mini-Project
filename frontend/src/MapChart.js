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

const MapChart = ({ setTooltipContent, inputText, setInfo }) => {
 

    return (
    <div style={{width:"70%",height:"80%"}}> 
    
      <h2>Hover anywhere in the map!</h2>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        {/* <ZoomableGroup> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    console.log(inputText);
                    console.log(geo.properties);
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                    talkWithBackendNow(inputText,NAME,setInfo)
                    
                        // fetch(geoUrl)
                        // .then(response=>response.json())
                        // .then(result=>console.log(result))
                
                }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#15c39a",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#15c39a",
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

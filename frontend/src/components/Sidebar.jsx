import React from 'react'

const Sidebar = ({ inputText,setInputText, info }) => {
  console.log(info);




  function makeRequest(value){

    setInputText(value)
    
  }

  function findTheClickedCountryLang (){

    if(!inputText.value){
      return;
    }
    const theSelectedCountry = info.find(item=>item.NAME == inputText.value)
    console.log(theSelectedCountry);
  }

  return (
    <div style={{width:"30%", display: "flex", flexDirection: "column"}}>

    <h1 style={{color:"#15c39a"}}>Language with Map fun!</h1>
    <div style={{paddingTop:"2em"}}> 
    <p>Translate...</p>
    <input type="text" 
          onChange={(e)=>makeRequest(e.target.value)}
          style={{width:"50%", margin: "0 auto"}}
    />
    </div>
    
    <div style={{marginTop:"1em"}}>
    {info.map((item)=>{
       return (
          
          <div style={{width:"90%",margin:"10px auto",border:"0.5px solid grey",borderRadius:"5px" }}>
          <h2>Translated text: {item.translatedText} in {item.country}</h2>
          {/* <p>Clicked Country: {item.clickedCountry}</p> */}
          </div>
        
      )
    })}
    </div>



  </div>
  
  
  
  )
}

export default Sidebar
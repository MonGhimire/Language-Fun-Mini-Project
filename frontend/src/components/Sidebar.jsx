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
    <p>Type a Word</p>
    <input type="text" 
          onChange={(e)=>makeRequest(e.target.value)}
          style={{width:"50%", margin: "0 auto"}}
    />
    </div>
    

    {info.map((item)=>{
       return (
        <>
          <h3>{item.translatedText}</h3>
          <p>{item.country}</p>
        </>
      )
    })}



  </div>
  
  
  
  )
}

export default Sidebar
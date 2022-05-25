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
    {info.map((item,i)=>{
      let backgroundColor =  i === 0? "pink" : "skyBlue"


       return (
          
          <div style={{width:"90%",margin:"10px auto",border:"0.5px solid grey",borderRadius:"5px",backgroundColor:backgroundColor }}>
          <h2>{item.translatedText}</h2>
          <p>{item.country}</p>
          {/* <p>Clicked Country: {item.clickedCountry}</p> */}
          </div>
        
      )
    })}
    </div>



  </div>
  
  
  
  )
}

export default Sidebar
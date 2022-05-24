import React from 'react'

const Sidebar = ({ setInputText, info }) => {

  function makeRequest(value){

    setInputText(value)

  }


  return (
  <div style={{width:"30%", border:"1px solid red", display: "flex", flexDirection: "column",justifyContent: "flex-start"}}>

    <h2>Fun with Language</h2>
    <p>Type a word in English</p>
    <input type="text" 
          onChange={(e)=>makeRequest(e.target.value)}
          style={{width:"50%", margin: "0 auto"}}
    />

    {info && <h2>See the magic of human-language-scripts!</h2>}
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
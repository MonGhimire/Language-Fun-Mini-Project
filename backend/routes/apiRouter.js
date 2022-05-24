import axios from "axios";
import express from "express";

const apiRouter = express.Router();


function findSubRegionCountries(data,selectedCountry){    
    let responseToBeSent = [];

     const geometriesArr = data.objects.ne_110m_admin_0_countries.geometries

     const geometriesProps = geometriesArr.map((item)=>(item.properties))

     const matchedCountry = geometriesProps.find((item)=>item.NAME === selectedCountry)
     console.log(matchedCountry);
     const subRegionCountries = (geometriesProps.filter((item)=>matchedCountry.SUBREGION === item.SUBREGION)).slice(0,4)
     
     const checkIfSubCountriesIncludesMatchedCountry = subRegionCountries.includes(matchedCountry)
    //  console.log(checkIfSubCountriesIncludesMatchedCountry);
    
     if(!checkIfSubCountriesIncludesMatchedCountry){
         responseToBeSent = [...subRegionCountries,matchedCountry]
         console.log(responseToBeSent);
    }
    return responseToBeSent;
}

function getTranslation(countryCode,text){
    



    return "1234";
}




apiRouter.post("/translate", (req,res)=>{

//  console.log(req.body);

 const dataFromGeoAPI =  axios({
     url: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
     method: 'get',
 }).then(result => {
     const countriesFromSubRegion = findSubRegionCountries(result.data,req.body.country)
     const finalResponse = countriesFromSubRegion.map((country)=>{
        const translatedText = getTranslation(country.ISO_A2, req.body.input)
             
        return {
            "translatedText": translatedText,
            "country": country.NAME
        }
    })

     res.send(finalResponse)



    //  const firstThreeNeighbors = subRegionCountries
    //  console.log(firstThreeNeighbors);
    }).catch((error)=>console.log(error))


    
//  const dataFromGoogleAPI = axios({
    // let match = arrOfCountries.find((item)=>item.data.country===req.body.country)
    // console.log(match);
//  })

//    const url = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'


    // console.log(responseFromAPI);
})

export default apiRouter
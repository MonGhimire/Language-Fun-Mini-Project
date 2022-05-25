import axios from "axios";
import express from "express";
import clm from "country-locale-map";
import LogReq from "../models/LogReq.js";


const apiRouter = express.Router();

function findSubRegionCountries(data, selectedCountry) {
  let responseToBeSent = [];

  const geometriesArr = data.objects.ne_110m_admin_0_countries.geometries;

  const geometriesProps = geometriesArr.map((item) => item.properties);

  const matchedCountry = geometriesProps.find(
    (item) => item.NAME === selectedCountry
  );

  const subRegionCountries = geometriesProps
    .filter((item) => matchedCountry.SUBREGION === item.SUBREGION)
    .slice(0, 2);

  const checkIfSubCountriesIncludesMatchedCountry =
    subRegionCountries.includes(matchedCountry);



//   checkIfSubCountriesIncludesMatchedCountry
//     ? (responseToBeSent = subRegionCountries)
//     : (responseToBeSent = [matchedCountry,...subRegionCountries]);

    if (!checkIfSubCountriesIncludesMatchedCountry) {
      responseToBeSent = [matchedCountry,...subRegionCountries];
     
    }else{
       let firstObj = subRegionCountries.find(country=>country.NAME===selectedCountry);
       let remainingCountries = subRegionCountries.filter(country=>country.NAME !== selectedCountry)
       responseToBeSent = [firstObj,...remainingCountries]
    }

  return responseToBeSent;
}

async function getTranslation(countryCode, text) {
  const url = "https://translation.googleapis.com/language/translate/v2";
  const key = process.env.KEY;
  let target = clm.getLocaleByAlpha3(countryCode);
  // console.log(target, target.length);
  target.length > 2 ? (target = target.slice(0, 2)) : (target = target);

  const data = {
    q: text,
    target: target,
  };

  try {
    const results = await LogReq.find({inputText: text, countryCode: countryCode})
    // console.log(results);
    if(results.length>0){
        return results[0].translatedText
    }
    console.log("making request to google", countryCode, text);
    const res = await axios({
      url: `${url}?key=${key}`,
      method: "POST",
      data: data,
    });
    return res.data.data.translations[0].translatedText;
  } catch (error) {
    // console.log(error);
    console.log(error.response.data);
    return null;
  }
}

apiRouter.post("/translate", async (req, res) => {


  const dataFromGeoAPI = axios({
    url: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
    method: "get",
  })
    .then(async (result) => {
      const countriesFromSubRegion = findSubRegionCountries(
        result.data,
        req.body.country
      );
      //   console.log(countriesFromSubRegion); ..this is showing the details of countries except the locale code info.

      let response = [];

      for (let i = 0; i < countriesFromSubRegion.length; i++) {
        const word = req.body.input  
        const country = countriesFromSubRegion[i];
        const translatedText = await getTranslation(
          country.ISO_A3,
          req.body.input
        );

        // if (translatedText) {
        //   response.push({
        //     translatedText: translatedText.data.translations[0].translatedText,
        //     country: country.NAME,
        //   });
        // } 
        if(translatedText){    
            const finalResponse = await LogReq.create({
                inputText: word,
                country: country.NAME,
                countryCode: country.ISO_A3,
                translatedText: translatedText
                // clickedCountry: req.body.country
            })
            response.push(finalResponse)
        }   
        


        
      }
      
      res.send(response);
    })
    .catch((error) => console.log(error));
});

export default apiRouter;

//   const finalResponse = countriesFromSubRegion.map((country) => {
//     const translatedText = getTranslation(country.ISO_A2, req.body.input);
//     return {
//       translatedText: translatedText,
//       country: country.NAME,
//       countryCode: country.ISO_A2
//     };
//   });

import axios from "axios";
import express from "express";

const apiRouter = express.Router();

apiRouter.post("/translate", (req,res)=>{
let arrOfCountries = [];
 console.log(req.body);
 const dataFromGeoAPI =  axios({
     url: "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json",
     method: 'get',
 }).then(result => {
     arrOfCountries = result.data
     const geometriesArr = arrOfCountries.objects.ne_110m_admin_0_countries.geometries

     const geometriesProps = geometriesArr.map((item)=>(item.properties))

     const match = geometriesProps.find((item)=>item.NAME === req.body.country)
     const subRegionCountries = geometriesProps.filter((item)=>match.SUBREGION === item.SUBREGION)
     
    //  const firstThreeNeighbors = subRegionCountries
    //  console.log(firstThreeNeighbors);
    }).catch((error)=>console.log(error))


    
//  const dataFromGoogleAPI = axios({
    // let match = arrOfCountries.find((item)=>item.data.country===req.body.country)
    // console.log(match);
//  })

//    const url = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

    res.send(req.body)

    // console.log(responseFromAPI);
})

export default apiRouter
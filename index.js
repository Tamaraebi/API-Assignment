//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path");
const axios = require("axios");
const { response } = require('express')
//Set up Express app and port number
const app = express();
const port = process.env.PORT || 8000;

//Set up template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Set up static file paths
app.use(express.static(path.join(__dirname, "public")));

var destination = 'country';

var flights;
var hotels;

app.get("/", async (request, response) => {
    response.render("index", {title: " Home"});
  });

app.get("/flights", (req,res) => {
   destination = req.query.country;
    getResult(res, destination);
})
app.get("/hotels", (req,res) => {
    destination = req.query.country;
     getHotel(res, destination);
 })
//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

async function getResult(res, country)
{
    //api to fetch flights
    const flightDest = {
        method: 'GET',
        url: 'https://skyscanner44.p.rapidapi.com/search-extended',
        params: {
          adults: '1',
          origin: 'YYC',
          destination: 'YYZ',
          departureDate: '2023-06-01',
          currency: 'CAD'
        },
        headers: {
          'X-RapidAPI-Key': '0aa8deafb6msh5556efc0ada27d1p15e249jsn9b2b06196923',
          'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
    };

     await axios.request(flightDest).then(function (response) {
        flights = response.data.itineraries.results;
        console.log(flights);

        res.render("flights", { title: "Flights", flights: flights});
    }).catch(function (error) {
        console.error(error);
    });
}
async function getHotel(res, country)
{
    //api to fetch hotels
    const hotelDest = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/hotels/list',
      params: {
        location_id: '293919',
        adults: '1',
        rooms: '1',
        nights: '2',
        currency: 'CAD',
        lang: 'en_US'
      },
      headers: {
        'X-RapidAPI-Key': '0aa8deafb6msh5556efc0ada27d1p15e249jsn9b2b06196923',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };
    
    await axios.request(hotelDest).then(function (response) {
        hotels = response.data.data;
        console.log(response.data.data);

        res.render("hotels", { title: "Hotels", hotels: hotels });
    }).catch(function (error) {
        console.error(error);
    });
}

/*res.render('index', { title: "Home", flights, hotels }) */




  
  
  
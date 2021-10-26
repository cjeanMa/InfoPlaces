require('dotenv').config()
const fs = require("fs");
const axios = require("axios");

class Search {

    logs = [];
    path = "./db/logs.json";

    constructor() {
        if(fs.existsSync(this.path)){
            let data = fs.readFileSync(this.path, {encoding: "utf-8"});
            this.logs = JSON.parse(data);
        } 
    }

    get paramsUrl() {
        return {
            'access_token': process.env.TOKEN_MAPBOX,
            'limit': 5,
            'language': "es"
        }
    }
    
    createParamsWeather(lon, lat){
        return{
            'lat': lat,
            'lon': lon,
            'appid': process.env.TOKEN_WEATHER,
            'units': "metric",
            'lang': 'es'
        }
    }

    searchByName = async (city = null) => {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?`,
                params: this.paramsUrl
            })
            let resp = await instance.get();
            return resp.data.features;
        }
        catch (err) {
            throw err;
        }
    }

    searchWeatherByCoordinates = async (lat, lon) =>{
        try{
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.createParamsWeather(lat, lon)
            })
            const { data } = await instance.get();
            return {
                des: data.weather[0].description,
                min: data.main.temp_min,
                max: data.main.temp_max,
                temp: data.main.temp,
            };
        }
        catch(err){
            throw err
        }
    }

    insertNewLog = (nPlace = "") =>{
        if(this.logs.includes(nPlace))
            return 
        this.logs.unshift(nPlace);
        this.updateDB();
    }

    updateDB = () =>{
        try{
            fs.writeFileSync(this.path, JSON.stringify(this.logs))
        }
        catch(err){
            throw err;
        }
        
    }

    showHistory = () =>{
        this.logs.forEach( (el, i) => {
            console.log(`${i+1}. ${el}`)
        })
    }

    drawInformationPlace = (objPlace, objWeather) => {
        console.log(`Nombre del lugar: ${objPlace.place_name_es}`);
        console.log(`Latitud: ${objPlace.geometry.coordinates[0]}`);
        console.log(`Longitud: ${objPlace.geometry.coordinates[1]}`);
        console.log(`Clima: ${objWeather.des}`);
        console.log(`Temperatura: ${objWeather.temp}`);
        console.log(`Minima:  ${objWeather.min}`);
        console.log(`Maxima:  ${objWeather.max}`);
    }


}

module.exports = Search;
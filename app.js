const { inquirerMenu, pause, readInput, listPlaces } = require("./utils/inquirer");
const Search = require("./models/search");

const main = async() =>{
    let search = new Search();
    let opt = ""
    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                let searching = await readInput("Nombre de Ciudad: ");
                let arrPlaces = await search.searchByName(searching);
                let idPlace = await listPlaces(arrPlaces);
                if(idPlace === "0") continue;  
                dataPlace = arrPlaces.find(el=>el.id === idPlace);
                search.insertNewLog(dataPlace.place_name_es);
                dataWeather = await search.searchWeatherByCoordinates(dataPlace.geometry.coordinates[0], dataPlace.geometry.coordinates[1]);
                search.drawInformationPlace(dataPlace, dataWeather);
                
                break;
            case 2:
                search.showHistory();
                break;
        }

        if(opt !== 0)
            await pause();
    }while(opt!==0)

}

main();
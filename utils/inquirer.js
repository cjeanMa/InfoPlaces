const inquirer = require("inquirer");

const question = [
    {
        type: 'list',
        name: 'option',
        message: 'Que deseas hacer?',
        choices: [
            {
                value: 1,
                name: "1. Buscar Ciudad"
            },
            {
                value: 2,
                name: "2. Historial"
            },
            {
                value: 0,
                name: "0. Salir"
            }
        ]
    }
]

const inquirerMenu = async() =>{
    console.clear()
    console.log("==========================");
    console.log("OPCIONES");
    console.log("==========================");

    let { option } = await inquirer.prompt(question);
    return option;
}

const pause = async() =>{
    console.log("\n");
    return await inquirer.prompt([{type:"input", message:"Press Enter to continue...", name: "pause"}])
}

const readInput = async(message) =>{
    const question = [
        {
            type: "input",
            name: "city",
            message,
            validate(value){
                if (value.length <= 2){
                    return "Ingrese un valor valido."
                }
                return true;
            }
        }
    ]
    const {city} = await inquirer.prompt(question);
    return city;
}

const listPlaces = async(arrPlaces = []) =>{

    let choices = arrPlaces.map(el => {
        return {
            value: el.id,
            name: el.place_name
        }
    })

    choices.unshift({
        value: "0",
        name: "Cancelar"
    })

    let options = [{
        type: "list",
        message: "Seleccione el lugar: ",
        name: "id",
        choices
    }]

    let { id } = await inquirer.prompt(options);
    return id;
} 

const confirmation = async(msg) =>{
    const question = [{
        type: "confirm",
        name: "ok",
        message: msg
    }]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const listChecklist = async(arrList) =>{

    let choices = arrList.map(el => {
        return {
            value: el.id,
            name: el.desc,
            checked: el.finished ? true : false
        }
    })

    let options = [{
        type: "checkbox",
        message: "Seleccione",
        name: "ids",
        choices
    }]

    let { ids } = await inquirer.prompt(options);
    return ids;
} 

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    listPlaces,
    confirmation,
    listChecklist
}
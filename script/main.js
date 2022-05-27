//LLAMADO GENERAL DEL API AL EJECUTAR EL PROGRAMA
const API_URL = "https://api.adviceslip.com/advice";

async function adviceGenerator() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const text = document.querySelector('h1')
    text.innerHTML = data.slip.advice;
    //console.log(data.slip.advice); 
}

adviceGenerator();

//LLAMADO DE UNA CONSULTA ESPECIFICA EN LA API

//Obtener el valor indicado por el usuario
function getSearchValue(){
    var searchValue = document.getElementById('search').value;
    var API_URL_SEARCH = API_URL + "/search/" + searchValue;
    //console.log(API_URL_SEARCH);
    searchAdviceGenerator(API_URL_SEARCH) 
}

//Generar la nueva consulta con los parámetros definidos 
async function searchAdviceGenerator(NEW_API_URL){
    const response = await fetch(NEW_API_URL);
    const data = await response.json();
    if(data.total_results <= 1){
        const text = document.querySelector('h1');
        text.innerHTML = data.slips[0].advice;
        console.log(data.slips[0].advice);
    } else {
        printData(data);
    }
}

function printData(data){
    const placeHolder = document.getElementById('advicePlaceholder');
    var advices = data.total_results;
    for(let i=0; i < advices; i++){
        var newPlaceHolder = document.createElement('h1');
        newPlaceHolder.innerHTML = data.slips[i].advice;
        placeHolder.appendChild(newPlaceHolder);
    }
}

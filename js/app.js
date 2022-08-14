const pokedex = document.querySelector(".pokedex");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("DOMContentLoaded", () =>{
    formulario.addEventListener("submit", buscarPokemon);
});


function buscarPokemon(e) {
    e.preventDefault();


    const nombre = document.querySelector("#nombre").value;

    if(nombre ===""){
        
        mostrarAlerta("El campo es Obligatorio!");
        return;
    }
    //Consultando la Api
    consumirApi(nombre);
}

function mostrarAlerta(mensaje){
     //Crear una alerta
     const repite = document.querySelector(".repite");
     const alerta = document.createElement("div");
     if(!repite){//Si no hay alerta creala
 
        alerta.classList.add("alerta","repite");
 
        alerta.innerHTML = `
            <strong>Error!</strong>
            <span>${mensaje}</span>
        `;
 
        resultado.appendChild(alerta);
 
        //Se elimine a los 3 segundos
        setTimeout(() =>{
            alerta.remove();
        },4000);
     }
}


function consumirApi(nombre){
    const url = ` https://pokeapi.co/api/v2/pokemon/${nombre}`;

    fetch(url)
        .then((respuesta) =>{
            return respuesta.json();
        })
        .then((datos) =>{
            limpiarHTML();
            console.log(datos);
            if(datos.cod === "404"){
                mostrarAlerta("Ciudad no encontrada");

                return;
            }
            //Imprime la respuesta en el html
            mostrarPokemon(datos);
        })
        
}


function mostrarPokemon(datos){

    limpiarHTML();

   const { name, sprites:{front_default}, id, base_experience } = datos;

   const imagenPokemon = document.createElement("img");
    imagenPokemon.src = `${front_default}`;

    const nombrePokemon = document.createElement("p");
    nombrePokemon.innerHTML = `${name}`;

    const idPokemon = document.createElement("p");
    idPokemon.innerHTML = `N° ${id}`;

    const tipoPokemon = document.createElement("p");
    tipoPokemon.innerHTML = `${datos.types[0].type.name}`;

    const hpPokemon = document.createElement("p");
    hpPokemon.innerHTML = `hp ${datos.stats[0].base_stat}`;

    const ataquePokemon = document.createElement("p");
    ataquePokemon.innerHTML = `Atack ${datos.stats[1].base_stat}`;

    const defensaPokemon = document.createElement("p");
    defensaPokemon.innerHTML = `Defense ${datos.stats[2].base_stat}`;

    const specialAtackPokemon = document.createElement("p");
    specialAtackPokemon.innerHTML = `Atack Special ${datos.stats[3].base_stat}`;

    const specialDefensePokemon = document.createElement("p");
    specialDefensePokemon.innerHTML = `Defense Special ${datos.stats[4].base_stat}`;

    const speedPokemon = document.createElement("p");
    speedPokemon.innerHTML = `Speed ${datos.stats[5].base_stat}`;

    const experiencePokemon = document.createElement("p");
    experiencePokemon.innerHTML = `Experience ${base_experience}`;
    
    const resultadoDiv = document.createElement("div");
    resultadoDiv.appendChild(imagenPokemon);
    resultadoDiv.appendChild(nombrePokemon);
    resultadoDiv.appendChild(idPokemon);
    resultadoDiv.appendChild(tipoPokemon);
    resultadoDiv.appendChild(hpPokemon);
    resultadoDiv.appendChild(ataquePokemon);
    resultadoDiv.appendChild(defensaPokemon);
    resultadoDiv.appendChild(specialAtackPokemon);
    resultadoDiv.appendChild(specialDefensePokemon);
    resultadoDiv.appendChild(speedPokemon);
    resultadoDiv.appendChild(experiencePokemon);

    resultado.appendChild(resultadoDiv);

}

//Para que no se esten amontonando los resultados 
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

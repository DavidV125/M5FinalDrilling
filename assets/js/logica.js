const asignarEventos = () => {
    let elBotonConsumo = document.getElementById('btnConsumo');
    elBotonConsumo.addEventListener('click', consumirAPIStarWarsCompleta);
    let elDivPopulares = document.getElementById('divPopulares');
    elDivPopulares.addEventListener('mouseenter', pintarPopulares);
    let elDivSecundarios = document.getElementById('divSecundarios');
    elDivSecundarios.addEventListener('mouseenter', pintarSecundarios);
    let elDivOtros = document.getElementById('divOtros');
    elDivOtros.addEventListener('mouseenter', pintarOtros);
};

let contadorPopulares = 1;
let contadorSecundarios = 6;
let contadorOtros = 12;

var generadorCrearCardPopulares = crearCardPopulares();
var generadorCrearCardSecundarios = crearCardSecundarios();
var generadorCrearCardOtros = crearCardOtros();

const consumirAPIStarWarsCompleta = async () => {
    console.log('Consumiendo todos los personajes de la API');
    let url = `https://swapi.dev/api/people/`;
    let siguientePagina = url;

    try {
        while (siguientePagina) {
            const respuesta = await fetch(siguientePagina);
            const objJsonRespuesta = await respuesta.json();
            
            objJsonRespuesta.results.forEach(personaje => {
                crearTarjeta(personaje, 'default');
            });

            siguientePagina = objJsonRespuesta.next; // Obtiene la URL de la siguiente página
        }
    } catch (error) {
        console.log('Error al consumir la API completa: ', error);
    }
};

const consumirAPIStarWars = (contador, color) => {
    console.log(`Consumiendo personaje ${contador} de la API`);
    let url = `https://swapi.dev/api/people/${contador}`;
    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((objJsonRespuesta) => {
            crearTarjeta(objJsonRespuesta, color);
        })
        .catch((error) => {
            console.log('Error al consumir personaje individual de la API: ', error);
        });
};

const crearTarjeta = (personaje, color) => {
    let divCard = document.createElement('div');
    divCard.setAttribute("class", "estilosCards");
    let laClaseCirculo = '';

    switch(color){
        case 'rojo':
            laClaseCirculo = "circuloRojo";
            break;
        case 'verde':
            laClaseCirculo = "circuloVerde";
            break;
        case 'azul':
            laClaseCirculo = "circuloAzul";
            break;
        default:
            laClaseCirculo = "circuloDefault";
    }
    
    let contenidoCard = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" id="txtNombre">
                    <div class=${laClaseCirculo}></div> ${personaje.name}
                </h5>
                <div class="container">
                    <div class="row">
                        <div class="col-6">
                            <p>Altura: <span id="txtAltura">${personaje.height}</span> cm </p>
                        </div>
                        <div class="col-6">
                            <p>Masa: <span id="txtMasa">${personaje.mass}</span> kg </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    divCard.innerHTML = contenidoCard;
    document.getElementById('contenedorCards').appendChild(divCard);
};

const pintarPopulares = () => {
    console.log('Pintando Populares');
    generadorCrearCardPopulares.next();
};

const pintarSecundarios = () => {
    console.log('Pintando Secundarios');
    generadorCrearCardSecundarios.next();
};

const pintarOtros = () => {
    console.log('Pintando Otros');
    generadorCrearCardOtros.next();
};

function* crearCardPopulares() {
    while (contadorPopulares <= 5) {
        consumirAPIStarWars(contadorPopulares, 'rojo');
        yield contadorPopulares++;
    }
}

function* crearCardSecundarios() {
    while (contadorSecundarios <= 11) {
        consumirAPIStarWars(contadorSecundarios, 'verde');
        yield contadorSecundarios++;
    }
}

function* crearCardOtros() {
    while (contadorOtros <= 17) {
        consumirAPIStarWars(contadorOtros, 'azul');
        yield contadorOtros++;
    }
}

//Inicializacion de variables globales
var lista = [];
var m = 50000;
var contador = 0;
var booleano = 0;
var ultSemilla = 0;
export var frecEsperada = 0;
export var cantidadIntervalos = 0;

//Permite resetear los valores del generador
export function dejarDeListar(setLista) {
    lista = [];
    contador = 0;
    booleano = 0;
    ultSemilla = 0;
    setLista([]);
}

//Funcion que genera 20 numeros pseudoaleatorios
export function generar20Numeros(metodo, semilla, CM, CA, num, setLista) {
    if (booleano === 1) {
        semilla = ultSemilla;
    }
    //Verificar que no se haya alcanzado el limite del generador
    if (contador < m) {
        //En caso de que se haya el metodo congruencial multiplicativo
        if (metodo === 0) {
            let corte = contador + num;
            //Se listan los 20 siguientes numeros al ultimo generado

            while (contador < corte) {
                //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
                semilla = (CM * semilla) % m;

                //Obtengo el número aleatorio y lo trunco a 4 decimales
                var n_aleatorio = Math.floor((semilla / m) * 10000) / 10000;

                //Agrego el número aleatorio a la lista
                lista.push(n_aleatorio);
                contador += 1
            }
            //Actualizo la lista
            setLista([...lista])
        }
        //En caso de que se haya seleccionado el metodo congruencial mixto
        else {
            let corte = contador + num;
            while (contador < corte) {
                //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
                semilla = (CM * semilla + parseInt(CA)) % m;

                //Obtengo el número aleatorio y lo trunco a 4 decimales
                let n_aleatorio = (Math.floor((semilla / m) * 10000)) / 10000;

                //Agrego el número aleatorio a la lista
                lista.push(n_aleatorio);
                contador += 1
            }
            //Actualizo la lista
            setLista([...lista])
        }
        ultSemilla = semilla
        booleano = 1
    }
    //En caso de que se hayan listado los 50000 números se muestra una alerta
    else {
        alert('Se alcanzó el límite posible.');
    }
}

//Listamos en la tabla hasta el final 50.000 a traves de los dos metodos
export function listarHastaFinal(metodo, semilla, CM, CA, setLista) {
    //En caso de que se haya seleccionado el metodo congruencial multiplicativo
    if (metodo === 0) {
        while (contador < m) {
            //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
            semilla = (CM * semilla) % m;

            //Obtengo el número aleatorio y lo trunco a 4 decimales
            let n_aleatorio = Math.floor((semilla / m) * 10000) / 10000;

            //Agrego el número aleatorio a la lista y acumulo en el contador de números
            lista.push(n_aleatorio);
            contador += 1
        }
        //Actualizo la lista
        setLista([...lista])
    }
    //En caso de que se haya seleccionado el metodo congruencial mixto
    else {
        while (contador < m) {
            //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
            semilla = (CM * semilla + parseInt(CA)) % m;

            //Obtengo el número aleatorio y lo trunco a 4 decimales
            let n_aleatorio = Math.floor((semilla / m) * 10000) / 10000;

            //Agrego el número aleatorio a la lista y acumulo en el contador de números
            lista.push(n_aleatorio);
            contador += 1;
        }
        //Actualizo la lista
        setLista([...lista])
    }
    console.log(lista);

}

//Listamos en la tabla a partir de dos valores DESDE - HASTA
export function listarDesdeHasta(metodo, semilla, constMultiplicativa, constAditiva, setLista) {
    //Generamos toda la lista sin renderizar
    listarHastaFinal(metodo, semilla, constMultiplicativa, constAditiva, setLista)
    console.log(lista);
    let desde = 0;
    let hasta = -1;
    while (desde > hasta) {
        desde = parseInt(prompt('Ingrese desde que número quiere listar'));
        hasta = parseInt(prompt('Ingrese hasta que número quiere listar'));
    }
    setLista(lista.slice(desde - 1, hasta));
}

//Generamos numeros aleatorios
export function nros_aleatorios(cantNros) {
    let numeros = [];
    for (let i = 0; i < cantNros; i++) {
        numeros.push(parseFloat(Math.random().toFixed(6)));
    }
    return numeros.sort(function (a, b) { return a - b });
}

//Lista de frecuencias
export function chiCuadrado(metodo, semilla, CA, CM, setIntervalos, setNumerosOrdenados, setLista) {
    let cantNros = parseInt(prompt('Cantidad de numeros'));
    let cantIntervalos = parseInt(prompt('Cantidad de intervalos'));

    cantidadIntervalos = cantIntervalos;

    //Defino la lista en la que van a estar los intervalos
    var intervalo = [];

    //Le asigno un tamaño de acuerdo a la cantidad de intervalos que se paso por datos
    while (cantIntervalos > intervalo.length) {
        intervalo.push(0);
    }

    //Determino el paso de cada intervalo
    var paso = 1 / cantIntervalos;

    if (metodo === 0) {
        //Se generan los números aleatorios con el mecanisco provisto por el lenguaje
        var nrosOrdenados = nros_aleatorios(cantNros);
        let numeroConIndice = nrosOrdenados.slice();
        numeroConIndice.push(nrosOrdenados[0])
        setLista(nrosOrdenados)
        setNumerosOrdenados(numeroConIndice)

    } else {
        nrosOrdenados = nros_congruencial(cantNros, semilla, CA, CM);
        let numeroConIndice = nrosOrdenados.slice();
        numeroConIndice.push(nrosOrdenados[0])
        setLista(nrosOrdenados)
        setNumerosOrdenados(numeroConIndice)

    }

    //Cuenta la cantidad de numeros que aparecen en cada intervalo
    for (let i = 1; i <= intervalo.length; i++) {
        for (let j = 0; j < nrosOrdenados.length; j++) {
            if ((nrosOrdenados[j] < (paso * i)) && (nrosOrdenados[j] > (paso * (i - 1)))) {
                intervalo[i - 1] += 1;
                setIntervalos([...intervalo])
            }
        }
    }

    //Determino la frecuencia esperada
    frecEsperada = parseFloat(nrosOrdenados.length / cantIntervalos).toFixed(4);

    //Inicializo el valor de chi
    var chi = 0

    //Obtengo el valor de chi de la muestra
    for (let x = 0; x < cantIntervalos; x++) {
        var frecObservada = intervalo[x];
        chi += ((frecEsperada - frecObservada) ** 2) / frecEsperada;
    }
    console.log("Frecuencia observada por cada intervalo: " + intervalo);
    console.log("Lista de números generados: " + nrosOrdenados);
    console.log("Valor de la frecuencia esperada: " + frecEsperada);
    console.log("Valor de chi cuadrado: " + chi.toFixed(3));
}

//Obtengo la lista de frecuencias observadas acumuladas
export function acumularFrecuenciasObservadas(lista, indice) {
    let acum = 0;
    for (let i = 0; i <= indice; i++) {
        acum += lista[i]
    }
    return acum;
}

//Obtengo la lista de valores de chiCuadrado para la tabla
export function calcularChi(lista, indice) {
    let chiCuadradoNumero = ((frecEsperada - lista[indice]) ** 2) / frecEsperada;
    return chiCuadradoNumero.toFixed(4);
}

//Obtengo la lista de chiCuadrado acumulado
export function acumularChi(lista, indice) {
    let acum = 0;
    for (let i = 0; i <= indice; i++) {
        acum += ((frecEsperada - lista[i]) ** 2) / frecEsperada;
    }
    return acum.toFixed(4);
}

//ChiCuadrado con metodos congruencial
export function nros_congruencial(cantNros, semilla, CA, CM) {
    let numeros = []
    for (let i = 0; i < cantNros; i++) {
        //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
        semilla = ((CM * semilla) + parseInt(CA)) % cantNros;

        //Obtengo el número aleatorio y lo trunco a 6 decimales
        let n_aleatorio = Math.floor((semilla / cantNros) * 1000000) / 1000000;
        numeros.push(n_aleatorio);
    }
    return numeros;
}

//Intervalos para la tabla 
export function obtenerIntervalos(cantIntervalos, indice) {
    let limites = []
    let inferior = 0;
    let superior = 1 / cantIntervalos;
    for (let i = 1; i <= cantIntervalos; i++) {
        limites.push(inferior.toFixed(3) + ' - ' + superior.toFixed(3));
        inferior = superior
        superior += 1 / cantIntervalos
    }
    console.log(limites);
    return limites[indice];
}

function contarDesdeHasta(indice){
    let contador = desde + indice
    return contador;
}
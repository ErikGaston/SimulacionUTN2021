//Inicializacion de variables globales
var lista = [];
var m = 50000;
var contador = 0;
var booleano = 0;
var ultSemilla = 0;

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
    if (booleano === 1){
        semilla = ultSemilla;
    }
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

export function listarHastaFinal(metodo, semilla, CM, CA, setLista){
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
} 

export function listarDesdeHasta(metodo, semilla, constMultiplicativa, constAditiva, setLista) {
    listarHastaFinal(metodo, semilla, constMultiplicativa, constAditiva, setLista)
    console.log(lista);
    let desde = 0;
    let hasta = -1;
    while (desde > hasta){
        desde = parseInt(prompt('Ingrese desde que número quiere listar'));
        hasta = parseInt(prompt('Ingrese hasta que número quiere listar'));
    }
    setLista(lista.slice(desde - 1, hasta));
}

export function nros_aleatorios(cantNros){
    let numeros = [];
    for(let i = 0; i < cantNros; i ++){
        numeros.push(parseFloat(Math.random().toFixed(6)));
    }
    return numeros.sort(function(a,b){return a - b});
}

export function chiCuadrado(cantIntervalos, cantNros){
    var intervalo = [];
    while (cantIntervalos > intervalo.length){
        intervalo.push(0);
    }
    var paso = 1 / cantIntervalos;
    var nrosOrdenados = nros_aleatorios(cantNros);
    for(let i = 1; i <= intervalo.length; i++){
        for(let j = 0; j < nrosOrdenados.length; j++){
            if ((nrosOrdenados[j] < (paso * i)) && (nrosOrdenados[j] > (paso * (i-1)))){
                intervalo[i-1] += 1;
            }
        }
    }
    var frecEsperada = parseInt(nrosOrdenados.length / cantIntervalos);
    var chi = 0
    for(let x = 0; x < cantIntervalos; x++){
        var frecObservada = intervalo[x];
        chi += ((frecEsperada - frecObservada)**2) / frecEsperada;
    }
    console.log("Frecuencia observada por cada intervalo: " + intervalo);
    console.log("Lista de números generados: " + nrosOrdenados);
    console.log("Valor de la frecuencia esperada: " + frecEsperada);
    console.log("Valor de chi cuadrado: " + chi.toFixed(3));
}

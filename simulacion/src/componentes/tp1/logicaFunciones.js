// Congruencial mixto: CM * SEMILLA + CA % LONGITUD
//Prueba de 5 numeros

var lista = [];
var semilla = parseInt(prompt('Introduzca el valor de la semilla', 1));
var CM = parseInt(prompt('Introduzca el valor de la constante multiplicativa. Recuerde que debe ser impar y no debe ser multiplo de 3 o 5.', 1));
var CA = parseInt(prompt('Introduzca el valor de la constante aditiva', 1));
var m = 50000;
var contador = 0;

export function validarNumeros() {

}

export function dejarDeListar(semilla, CM, CA, contador) {
    lista = [];
    semilla = parseInt(prompt('Introduzca el valor de la semilla', 1));
    CM = parseInt(prompt('Introduzca el valor de la constante multiplicativa. Recuerde que debe ser impar y no debe ser multiplo de 3 o 5.', 1));
    CA = parseInt(prompt('Introduzca el valor de la constante aditiva', 1));
    m = 50000;
    contador = 0;
}

export function generar20Numeros(contador, semilla, CM, CA) {
    if (contador < m) {
        let corte = contador + 20;
        while (contador < corte) {
            //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
            var resto = (CM * semilla + CA) % m;
            semilla = resto;

            //Obtengo el número aleatorio y lo trunco a 4 decimales
            var n1 = resto / (m - 1);
            var n_aleatorio = Math.floor(n1 * 10000) / 10000;

            //Agrego el número aleatorio a la lista
            lista.push(n_aleatorio);
            contador += 1
        }
        console.log(lista);
    } else {
        alert('Se alcanzó el límite posible.');
    }

}


export function listarHastaFinal(semilla, CM, CA, contador, a = true) {
    while (contador < m) {
        //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
        var resto = (CM * semilla + CA) % m;
        semilla = resto;

        //Obtengo el número aleatorio y lo trunco a 4 decimales
        var n1 = resto / (m - 1);
        var n_aleatorio = Math.floor(n1 * 10000) / 10000;

        //Agrego el número aleatorio a la lista
        lista.push(n_aleatorio);
        contador += 1
    }
    if (a) {
        console.log(lista);
    }
}


export function listarDesdeHasta(desde, hasta) {
    // listarFinal(false)
    // let desde = parseInt(prompt('Ingrese desde que número quiere listar'));
    // let hasta = parseInt(prompt('Ingrese hasta que número quiere listar'));
    console.log(lista.slice(desde + 1, hasta + 1));

}
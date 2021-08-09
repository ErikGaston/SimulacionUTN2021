// Congruencial mixto: CM * SEMILLA + CA % LONGITUD
//Prueba de 5 numeros

var lista = [];
var m = 50000;
var contador = 0;

export function validarNumeros() {

}

export function dejarDeListar(setLista) {
    lista = [];
    m = 50000;
    contador = 0;
    setLista([])
}

export function generar20Numeros(metodo, semilla, CM, CA, num, setLista) {
    if (metodo === 0) {
        if (contador < m) {
            let corte = contador + num;
            while (contador < corte) {
                //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
                semilla = (CM * semilla) % m;

                //Obtengo el número aleatorio y lo trunco a 4 decimales
                var n1 = semilla / (m - 1);
                var n_aleatorio = Math.floor(n1 * 10000) / 10000;
                // var n_aleatorio = Math.random(n1).toFixed(4);

                //Agrego el número aleatorio a la lista
                lista.push(n_aleatorio);
                contador += 1
            }
            setLista([...lista])
        } else {
            alert('Se alcanzó el límite posible.');
        }
    }
    else {
        if (contador < m) {
            let corte = contador + num;
            while (contador < corte) {
                //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
                semilla = (CM * semilla + CA) % m;

                //Obtengo el número aleatorio y lo trunco a 4 decimales
                var n1 = semilla / (m - 1);
                var n_aleatorio = Math.floor(n1 * 10000) / 10000;
                // var n_aleatorio = Math.random(n1).toFixed(4);

                //Agrego el número aleatorio a la lista
                lista.push(n_aleatorio);
                contador += 1
            }
            setLista([...lista])
        } else {
            alert('Se alcanzó el límite posible.');
        }
    }
}

export function listarHastaFinal(metodo, semilla, CM, CA, setLista) {
    if (metodo === 0) {
        while (contador < m) {
            //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
            semilla = (CM * semilla) % m;

            //Obtengo el número aleatorio y lo trunco a 4 decimales
            var n1 = semilla / (m - 1);
            var n_aleatorio = Math.floor(n1 * 10000) / 10000;
            // var n_aleatorio = Math.random(n1).toFixed(4);

            //Agrego el número aleatorio a la lista
            lista.push(n_aleatorio);
            contador += 1
        }
        setLista([...lista])
    }
    else {
        if (contador < m) {
            while (contador < m) {
                //Obtengo la semilla del proximo paso y la asigno a la variable correspondiente
                semilla = (CM * semilla + CA) % m;

                //Obtengo el número aleatorio y lo trunco a 4 decimales
                var n1 = semilla / (m - 1);
                var n_aleatorio = Math.floor(n1 * 10000) / 10000;
                // var n_aleatorio = Math.random(n1).toFixed(4);

                //Agrego el número aleatorio a la lista
                lista.push(n_aleatorio);
                contador += 1
            }
            setLista([...lista])
        } else {
            alert('Se alcanzó el límite posible.');
        }
    }
}

export function listarDesdeHasta(metodo, semilla, constMultiplicativa, constAditiva, setLista) {
    listarHastaFinal(metodo, semilla, constMultiplicativa, constAditiva, setLista)
    let desde = parseInt(prompt('Ingrese desde que número quiere listar'));
    let hasta = parseInt(prompt('Ingrese hasta que número quiere listar'));
    console.log(lista.slice(desde + 1, hasta + 1));
    setLista(lista.slice(desde + 1, hasta + 1));
}
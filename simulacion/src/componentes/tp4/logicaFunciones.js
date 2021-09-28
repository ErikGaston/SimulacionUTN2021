let tiempo = [];
let frecObservada = [];

function uniforme(a, b) {
    let rnd = Math.random();
    let numero = (a + (rnd.toFixed(2)) * (b - a)).toFixed(2);
    return numero;
}

function normal(media, desviacion) {
    let rnd1 = Math.random();
    let rnd2 = Math.random()
    let z = Math.sqrt(-2 * (Math.log(rnd1))) * Math.cos(2 * Math.PI * rnd2)
    let x = (media + z * desviacion).toFixed(2);
    return x;
}

function exponencial(media) {
    let rnd = Math.random();
    let numero = ((-media) * Math.log(1 - rnd)).toFixed(2);
    return numero;
}


function generarVectorEstado(vectorAnterior) {
    let t1 = parseFloat(uniforme(20, 30));
    let t2 = parseFloat(uniforme(30, 50));
    let t3 = parseFloat(exponencial(30));
    let t4 = parseFloat((parseFloat(uniforme(10, 20)) + t1).toFixed(2));
    let t5 = parseFloat((parseFloat(exponencial(5)) + Math.max(t2, t4)).toFixed(2));
    let tiempoTotal = parseFloat((Math.max(t3, t5)).toFixed(2));
    let tiempoPromedio = parseFloat(((1 / (vectorAnterior[0] + 1)) * ((vectorAnterior[0] * vectorAnterior[7]) + tiempoTotal)).toFixed(2));
    let maximo = 0;
    let minimo = 0;
    if (vectorAnterior[8] < tiempoTotal) {
        maximo = tiempoTotal;
    }
    else {
        maximo = vectorAnterior[8];
    }
    if (vectorAnterior[9] > tiempoTotal) {
        minimo = tiempoTotal;
    }
    else {
        minimo = vectorAnterior[9];
    }
    let contador = vectorAnterior[10]
    if (tiempoTotal <= 45) {
        contador += 1
    }
    let prob45 = (contador / (vectorAnterior[0])).toFixed(2);
    let nuevoVector = [vectorAnterior[0] + 1, t1, t2, t3, t4, t5, tiempoTotal, tiempoPromedio, maximo, minimo, contador, prob45];
    return nuevoVector
}

function rellenarTabla(filaNueva) {
    var tCuerpo = document.getElementById('cuerpoTabla');
    var fila = document.createElement('tr');
    for (let j = 0; j < 12; j++) {
        var col = document.createElement('td');
        col.innerHTML = filaNueva[j];
        fila.appendChild(col);
    }
    tCuerpo.appendChild(fila)
}

export function scriptPrincipal(cantSimulaciones) {
    vaciarTabla()
    let vector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 999999999, 0, 0];
    rellenarTabla(vector)
    if (cantSimulaciones > 0) {
        for (let i = 0; i < cantSimulaciones; i++) {
            vector = generarVectorEstado(vector);
            if (i < 9999 || (((i + 1) % 10000) == 0)) {
                rellenarTabla(vector);
            }
        }
    }
}

export function desdeHasta(desde, hasta) {
    vaciarTabla();
    let vector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 999999999, 0, 0];
    for (let i = 0; i < hasta; i++) {
        vector = generarVectorEstado(vector);
        if ((i + 1) >= desde) {
            rellenarTabla(vector)
        }
    }
}

export function vaciarTabla() {
    var Table2 = document.getElementById("cuerpoTabla2");
    Table2.innerHTML = "";
    var Table = document.getElementById("cuerpoTabla");
    Table.innerHTML = "";
}

export function obtenerNoventa() {
    vaciarTabla()
    let vector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 999999999, 0, 0];
    tiempo = []
    rellenarTabla(vector)
    frecObservada = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let limInf = []
    let limSup = []
    for (let i = 0; i < 14; i++) {
        vector = generarVectorEstado(vector);
        rellenarTabla(vector)
        tiempo.push(vector[6])
    }
    let paso = parseFloat(((vector[8] - vector[9]) / 15).toFixed(2));
    console.log(vector[9], paso)
    for (let j = 0; j < frecObservada.length; j++) {
        limInf.push((vector[9] + (j * paso)).toFixed(2))
        limSup.push((vector[9] + ((j + 1) * paso)).toFixed(2))
        for (let z = 0; z < tiempo.length; z++) {
            if (j == 0) {
                if ((tiempo[z] < (vector[9] + paso))) {
                    frecObservada[j] += 1
                }
            } else {
                if (j != 14) {
                    if ((tiempo[z] >= (vector[9] + (j * paso))) && (tiempo[z] < (vector[9] + ((j + 1) * paso)))) {
                        frecObservada[j] += 1
                    }
                }
                else {
                    console.log(j)
                    if ((tiempo[z] >= (vector[9] + (j * paso))) && (tiempo[z] <= (vector[8]))) {
                        frecObservada[j] += 1
                    }
                }
            }
        }
    }
    var tCuerpo2 = document.getElementById('cuerpoTabla2');
    limInf[0] = vector[9]
    limSup[14] = vector[8]
    let prob = 0
    let probAcum = 0
    let band = 0
    let filaNueva = ""
    for (let x = 0; x < 15; x++) {
        prob = parseFloat((frecObservada[x] / 14).toFixed(2))
        probAcum = parseFloat((prob + probAcum).toFixed(2))
        filaNueva = '<tr>' +
            '<td>' + parseInt(x + 1) + '</td>' +
            '<td>' + limInf[x] + '</td>' +
            '<td>' + limSup[x] + '</td>' +
            '<td>' + frecObservada[x] + '</td>' +
            '<td>' + prob + '</td>' +
            '<td>' + probAcum + '</td>' +
            '</tr>';
        if (band == 0 && probAcum >= 0.9) {
            filaNueva = '<tr>' +
                '<td>' + parseInt(x + 1) + '</td>' +
                '<td>' + limInf[x] + '</td>' +
                '<td>' + limSup[x] + '</td>' +
                '<td>' + frecObservada[x] + '</td>' +
                '<td>' + prob + '</td>' +
                '<td id="id1">' + probAcum + '</td>' +
                '</tr>';
            band = 1;
        }

        tCuerpo2.innerHTML += filaNueva;
    }

}
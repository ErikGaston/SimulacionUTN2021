
let tiempo = [];
let frecObservada = [];
export let tiempoP = [];
var tablaStudent = [0,6.31,2.91,2.35,2.13,2.01,1.94,1.89,1.85,1.83,1.81,1.79,1.78,1.77,1.76,1.75,1.74,
    1.73,1.73,1.72,1.72,1.72,1.71,1.71,1.71,1.70,1.70,1.70,1.70,1.69,1.69,1.69,1.69,
    1.69,1.69,1.68,1.68,1.68,1.68,1.68,1.68,1.68,1.68,1.68,1.68,1.67,1.67,1.67,1.67,
    1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.67,1.66,1.66,1.66,
    1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,
    1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,1.66,
    1.66,1.66,1.66,1.66,1.66,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,
    1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,
    1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65,
    1.65,1.65,1.65,1.65,1.65,1.65,1.65,1.65]

export let datos = [];

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

function sacarDistribucion(variable) {
    switch (variable.metodo) {
        case 0:
            return uniforme(variable.a, variable.b);
        case 1:
            return normal(variable.media, variable.desviacion);
        case 2:
            return exponencial(variable.media);
        default:
            break;
    }
}

export function generarVectorEstado2(vectorAnterior, variable1, variable2, variable3, variable4, variable5) {
    let t1 = sacarDistribucion(variable1);
    let t2 = sacarDistribucion(variable2);
    let t3 = sacarDistribucion(variable3);
    let t4 = sacarDistribucion(variable4);
    let t5 = sacarDistribucion(variable5);
    let varianza = 0
    let tStudent = 0
    let confianza = 0
    let tiempoTotal = parseFloat((Math.max(t3, t5)).toFixed(2));
    let tiempoPromedio = parseFloat(((1 / (vectorAnterior[0] + 1)) * ((vectorAnterior[0] * vectorAnterior[7]) + tiempoTotal)).toFixed(2));
    let maximo = 0;
    let minimo = 0;
    if (vectorAnterior[10] < tiempoTotal) {
        maximo = tiempoTotal;
    }
    else {
        maximo = vectorAnterior[10];
    }
    if (vectorAnterior[11] > tiempoTotal) {
        minimo = tiempoTotal;
    }
    else {
        minimo = vectorAnterior[11];
    }
    let contador = vectorAnterior[12]
    if (tiempoTotal <= 45) {
        contador += 1
    }
    let prob45 = (contador / (vectorAnterior[0])).toFixed(2);
    if(vectorAnterior[0] != 0){
        let parentesis = (tiempoPromedio-tiempoTotal)*(tiempoPromedio-tiempoTotal)
        varianza = ((1/vectorAnterior[0])*((vectorAnterior[0]-1)*vectorAnterior[8] + (((vectorAnterior[0]+1)/vectorAnterior[0])*parentesis))).toFixed(2)
        if (vectorAnterior[0]+1 > 153){
            tStudent = 1.64
        }
        else{
            tStudent = tablaStudent[vectorAnterior[0]+1]
        }
        confianza = (tiempoPromedio + tStudent * Math.sqrt(varianza) / Math.sqrt(vectorAnterior[0]+1)).toFixed(2)
    }
    let nuevoVector = [vectorAnterior[0] + 1, t1, t2, t3, t4, t5, tiempoTotal, tiempoPromedio,confianza, maximo, minimo, contador, prob45];
    return nuevoVector
}

function generarVectorEstado(vectorAnterior) {
    let t1 = parseFloat(uniforme(20, 30));
    let t2 = parseFloat(uniforme(30, 50));
    let t3 = parseFloat(exponencial(30));
    let t4 = parseFloat((parseFloat(uniforme(10, 20)) + t1).toFixed(2));
    let t5 = parseFloat((parseFloat(exponencial(5)) + Math.max(t2, t4)).toFixed(2));
    let varianza = 0
    let tStudent = 0
    let confianza = 0
    let tiempoTotal = parseFloat((Math.max(t3, t5)).toFixed(2));
    let tiempoPromedio = parseFloat(((1 / (vectorAnterior[0] + 1)) * ((vectorAnterior[0] * vectorAnterior[7]) + tiempoTotal)).toFixed(2));
    let maximo = 0;
    let minimo = 0;
    if (vectorAnterior[10] < tiempoTotal) {
        maximo = tiempoTotal;
    }
    else {
        maximo = vectorAnterior[10];
    }
    if (vectorAnterior[11] > tiempoTotal) {
        minimo = tiempoTotal;
    }
    else {
        minimo = vectorAnterior[11];
    }
    let contador = vectorAnterior[12]
    if (tiempoTotal <= 45) {
        contador += 1
    }
    if(vectorAnterior[0] != 0){
        let parentesis = (tiempoPromedio-tiempoTotal)*(tiempoPromedio-tiempoTotal)
        varianza = ((1/vectorAnterior[0])*((vectorAnterior[0]-1)*vectorAnterior[8] + (((vectorAnterior[0]+1)/vectorAnterior[0])*parentesis))).toFixed(2)
        if (vectorAnterior[0]+1 > 153){
            tStudent = 1.64
        }
        else{
            tStudent = tablaStudent[vectorAnterior[0]+1]
        }
        confianza = (tiempoPromedio + tStudent * Math.sqrt(varianza) / Math.sqrt(vectorAnterior[0]+1)).toFixed(2)
    }
    let prob45 = (contador / (vectorAnterior[0])).toFixed(2);
    let nuevoVector = [vectorAnterior[0] + 1, t1, t2, t3, t4, t5, tiempoTotal, tiempoPromedio,varianza, confianza, maximo, minimo, contador, prob45];
    tiempoP.push(tiempoPromedio)
    return nuevoVector
}

function rellenarTabla(filaNueva) {
    var tCuerpo = document.getElementById('cuerpoTabla');
    var fila = document.createElement('tr');
    for(let j = 0; j<39;j++){
        var col = document.createElement('td');
        col.innerHTML = filaNueva[j];
        fila.appendChild(col);
    }
    tCuerpo.appendChild(fila)
}

export function scriptPrincipal(cantSimulaciones, setData){
    vaciarTabla()
    datos=[]
    let intervalos = []
    let vectorCritico = [0,0,0,0,0]
    let vector = [0,0,0,0,0,0,0,0,0,0,0,999999999,0,0];
    let probCritico = [0,0,0,0,0]
    let tarde = []
    rellenarTabla(vector)
    let vectorContador = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    let vectorFinal = []
    let vectorProb = [(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2)]
    if (cantSimulaciones>0){
        for(let i=0; i < cantSimulaciones;i++){
            vector = generarVectorEstado(vector);
            if (i < 500){
                datos.push(vector[7])
            }
            vectorCritico = caminoCritico(vector, vectorCritico)
            probCritico = [(vectorCritico[0]*100/vector[0]).toFixed(2),(vectorCritico[1]*100/vector[0]).toFixed(2),(vectorCritico[2]*100/vector[0]).toFixed(2),(vectorCritico[3]*100/vector[0]).toFixed(2),(vectorCritico[4]*100/vector[0]).toFixed(2)]
            tarde = inicioTardio(vector)
            if (i < 15){
                intervalos.push(vector[6])
                intervalos.sort(function(a, b){return a - b});
            }
            if (i > 14){
                vectorContador = contarLimites(vector, vectorContador,intervalos)
                vectorProb = [(vectorContador[0]/vector[0]).toFixed(2),(vectorContador[1]/vector[0]).toFixed(2),(vectorContador[2]/vector[0]).toFixed(2),(vectorContador[3]/vector[0]).toFixed(2),(vectorContador[4]/vector[0]).toFixed(2),(vectorContador[5]/vector[0]).toFixed(2),(vectorContador[6]/vector[0]).toFixed(2),(vectorContador[7]/vector[0]).toFixed(2),(vectorContador[8]/vector[0]).toFixed(2),(vectorContador[9]/vector[0]).toFixed(2),(vectorContador[10]/vector[0]).toFixed(2),(vectorContador[11]/vector[0]).toFixed(2),(vectorContador[12]/vector[0]).toFixed(2),(vectorContador[13]/vector[0]).toFixed(2),(vectorContador[14]/vector[0]).toFixed(2)]
            }
            if (i == 14){
                cambiarTabla(intervalos)
            }
            vectorFinal = vector.concat(vectorProb,probCritico,tarde)
            if (i < 9999 || (((i+1) % 10000) == 0)){
                rellenarTabla(vectorFinal);
            }
        }
        let vectorAcumulado = encontrarAcum(vectorProb)
        rellenarVector(vectorAcumulado)
        setData(datos)
    }
    //crearGrafico(datos);
}

export function scriptPrincipal2(cantSimulaciones, t1, t2, t3, t4, t5) {
    vaciarTabla()
    datos=[]
    let intervalos = []
    let vectorCritico = [0,0,0,0,0]
    let vector = [0,0,0,0,0,0,0,0,0,0,0,999999999,0,0];
    let probCritico = [0,0,0,0,0]
    let tarde = []
    rellenarTabla(vector)
    let vectorContador = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    let vectorFinal = []
    let vectorProb = [(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2)]
    if (cantSimulaciones > 0) {
        for (let i = 0; i < cantSimulaciones; i++) {
            vector = generarVectorEstado2(vector, t1, t2, t3, t4, t5);
            if (i < 1000){
                datos.push(vector[6])
            }
            vectorCritico = caminoCritico(vector, vectorCritico)
            probCritico = [(vectorCritico[0]*100/vector[0]).toFixed(2),(vectorCritico[1]*100/vector[0]).toFixed(2),(vectorCritico[2]*100/vector[0]).toFixed(2),(vectorCritico[3]*100/vector[0]).toFixed(2),(vectorCritico[4]*100/vector[0]).toFixed(2)]
            tarde = inicioTardio(vector)
            if (i < 15){
                intervalos.push(vector[6])
                intervalos.sort(function(a, b){return a - b});
            }
            if (i > 14){
                vectorContador = contarLimites(vector, vectorContador,intervalos)
                vectorProb = [(vectorContador[0]/vector[0]).toFixed(2),(vectorContador[1]/vector[0]).toFixed(2),(vectorContador[2]/vector[0]).toFixed(2),(vectorContador[3]/vector[0]).toFixed(2),(vectorContador[4]/vector[0]).toFixed(2),(vectorContador[5]/vector[0]).toFixed(2),(vectorContador[6]/vector[0]).toFixed(2),(vectorContador[7]/vector[0]).toFixed(2),(vectorContador[8]/vector[0]).toFixed(2),(vectorContador[9]/vector[0]).toFixed(2),(vectorContador[10]/vector[0]).toFixed(2),(vectorContador[11]/vector[0]).toFixed(2),(vectorContador[12]/vector[0]).toFixed(2),(vectorContador[13]/vector[0]).toFixed(2),(vectorContador[14]/vector[0]).toFixed(2)]
            }
            if (i == 14){
                cambiarTabla(intervalos)
            }
            vectorFinal = vector.concat(vectorProb, probCritico, tarde)
            if (i < 9999 || (((i + 1) % 10000) == 0)) {
                rellenarTabla(vectorFinal);
            }
        }
        let vectorAcumulado = encontrarAcum(vectorProb)
        rellenarVector(vectorAcumulado)
    }
}

export function desdeHasta(desde, hasta) {
    vaciarTabla()
    datos=[]
    let intervalos = []
    let tarde = []
    let vectorCritico = [0,0,0,0,0]
    let vector = [0,0,0,0,0,0,0,0,0,0,0,999999999,0,0];
    let vectorContador = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    let vectorFinal = []
    let probCritico = [0,0,0,0,0]
    let vectorProb = [(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2)]
    for(let i=0; i < hasta ;i++){
        vector = generarVectorEstado(vector);
        vectorCritico = caminoCritico(vector, vectorCritico)
        probCritico = [(vectorCritico[0]*100/vector[0]).toFixed(2),(vectorCritico[1]*100/vector[0]).toFixed(2),(vectorCritico[2]*100/vector[0]).toFixed(2),(vectorCritico[3]*100/vector[0]).toFixed(2),(vectorCritico[4]*100/vector[0]).toFixed(2)]
        tarde = inicioTardio(vector)
        if (i < 15){
            intervalos.push(vector[6])
            intervalos.sort(function(a, b){return a - b});
        }
        if (i > 14){
            vectorContador = contarLimites(vector, vectorContador,intervalos)
            vectorProb = [(vectorContador[0]/vector[0]).toFixed(2),(vectorContador[1]/vector[0]).toFixed(2),(vectorContador[2]/vector[0]).toFixed(2),(vectorContador[3]/vector[0]).toFixed(2),(vectorContador[4]/vector[0]).toFixed(2),(vectorContador[5]/vector[0]).toFixed(2),(vectorContador[6]/vector[0]).toFixed(2),(vectorContador[7]/vector[0]).toFixed(2),(vectorContador[8]/vector[0]).toFixed(2),(vectorContador[9]/vector[0]).toFixed(2),(vectorContador[10]/vector[0]).toFixed(2),(vectorContador[11]/vector[0]).toFixed(2),(vectorContador[12]/vector[0]).toFixed(2),(vectorContador[13]/vector[0]).toFixed(2),(vectorContador[14]/vector[0]).toFixed(2)]  
        }
        if (i == 14){
            cambiarTabla(intervalos)
        }
        vectorFinal = vector.concat(vectorProb,probCritico,tarde)
        if ((i+1) >= desde){
            rellenarTabla(vectorFinal)
        }
    }
    let vectorAcumulado = encontrarAcum(vectorProb)
    rellenarVector(vectorAcumulado)
}
export function desdeHasta2(desde, hasta, t1, t2, t3, t4, t5) {
    vaciarTabla()
    datos=[]
    let intervalos = []
    let tarde = []
    let vectorCritico = [0,0,0,0,0]
    let vector = [0,0,0,0,0,0,0,0,0,0,0,999999999,0,0];
    let vectorContador = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    let vectorFinal = []
    let probCritico = [0,0,0,0,0]
    let vectorProb = [(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2),(1/15).toFixed(2)]
    for(let i=0; i < hasta ;i++){
        vector = generarVectorEstado2(vector, t1, t2, t3, t4, t5);
        vectorCritico = caminoCritico(vector, vectorCritico)
        probCritico = [(vectorCritico[0]*100/vector[0]).toFixed(2),(vectorCritico[1]*100/vector[0]).toFixed(2),(vectorCritico[2]*100/vector[0]).toFixed(2),(vectorCritico[3]*100/vector[0]).toFixed(2),(vectorCritico[4]*100/vector[0]).toFixed(2)]
        tarde = inicioTardio(vector)
        if (i < 15){
            intervalos.push(vector[6])
            intervalos.sort(function(a, b){return a - b});
        }
        if (i > 14){
            vectorContador = contarLimites(vector, vectorContador,intervalos)
            vectorProb = [(vectorContador[0]/vector[0]).toFixed(2),(vectorContador[1]/vector[0]).toFixed(2),(vectorContador[2]/vector[0]).toFixed(2),(vectorContador[3]/vector[0]).toFixed(2),(vectorContador[4]/vector[0]).toFixed(2),(vectorContador[5]/vector[0]).toFixed(2),(vectorContador[6]/vector[0]).toFixed(2),(vectorContador[7]/vector[0]).toFixed(2),(vectorContador[8]/vector[0]).toFixed(2),(vectorContador[9]/vector[0]).toFixed(2),(vectorContador[10]/vector[0]).toFixed(2),(vectorContador[11]/vector[0]).toFixed(2),(vectorContador[12]/vector[0]).toFixed(2),(vectorContador[13]/vector[0]).toFixed(2),(vectorContador[14]/vector[0]).toFixed(2)]  
        }
        if (i == 14){
            cambiarTabla(intervalos)
        }
        vectorFinal = vector.concat(vectorProb,probCritico,tarde)
        if ((i+1) >= desde){
            rellenarTabla(vectorFinal)
        }
    }
    let vectorAcumulado = encontrarAcum(vectorProb)
    rellenarVector(vectorAcumulado)
}

export function vaciarTabla() {
    var Table2 = document.getElementById('cuerpoVector');
    Table2.innerHTML = "";
    var Table = document.getElementById("cuerpoTabla");
    Table.innerHTML = "";
}

export function rellenarVector(vector){
    let cuerpo = document.getElementById('cuerpoVector');
    var fil = document.createElement('tr');
    for(let j = 0; j<15;j++){
        var columna = document.createElement('td');
        columna.innerHTML = vector[j];
        fil.appendChild(columna);
    }
    cuerpo.appendChild(fil)
}

export function cambiarTabla(intervalos){
    let encabezado = document.getElementById('TableHead');
    let vectorAcum = document.getElementById('vectorAcum')
    let titulos = '<tr>' + 
                    '<th>#</th>' + 
                    '<th>T1</th>' +
                    '<th>T2</th>' +
                    '<th>T3</th>' +
                    '<th>T4</th>' + 
                    '<th>T5</th>' +
                    '<th>Tiempo Total</th>' +
                    '<th>Tiempo Promedio</th>' +
                    '<th>Varianza</th>' +
                    '<th>Tiempo 90%</th>' +
                    '<th>Maximo</th>' +
                    '<th>Minimo</th>' +
                    '<th>Contar Proporcion</th>' +
                    '<th>Probabilidad(45)</th>' +
                    '<th>'+intervalos[0]+'</th>' + 
                    '<th>'+intervalos[1]+'</th>' +
                    '<th>'+intervalos[2]+'</th>' + 
                    '<th>'+intervalos[3]+'</th>' +
                    '<th>'+intervalos[4]+'</th>' + 
                    '<th>'+intervalos[5]+'</th>' +
                    '<th>'+intervalos[6]+'</th>' + 
                    '<th>'+intervalos[7]+'</th>' +
                    '<th>'+intervalos[8]+'</th>' +  
                    '<th>'+intervalos[9]+'</th>' +
                    '<th>'+intervalos[10]+'</th>' + 
                    '<th>'+intervalos[11]+'</th>' +
                    '<th>'+intervalos[12]+'</th>' + 
                    '<th>'+intervalos[13]+'</th>' +
                    '<th> >'+intervalos[13]+'</th>' +
                    '<th>C. A1</th>' + 
                    '<th>C. A2</th>' +
                    '<th>C. A3</th>' + 
                    '<th>C. A4</th>' +
                    '<th>C. A5</th>' +
                    '<th>Tarde A1</th>' + 
                    '<th>Tarde A2</th>' +
                    '<th>Tarde A3</th>' + 
                    '<th>Tarde A4</th>' +
                    '<th>Tarde A5</th>' +
                '</tr>';
    let vector = '<tr>' +
                    '<th>'+intervalos[0]+'</th>' + 
                    '<th>'+intervalos[1]+'</th>' +
                    '<th>'+intervalos[2]+'</th>' + 
                    '<th>'+intervalos[3]+'</th>' +
                    '<th>'+intervalos[4]+'</th>' + 
                    '<th>'+intervalos[5]+'</th>' +
                    '<th>'+intervalos[6]+'</th>' + 
                    '<th>'+intervalos[7]+'</th>' +
                    '<th>'+intervalos[8]+'</th>' +  
                    '<th>'+intervalos[9]+'</th>' +
                    '<th>'+intervalos[10]+'</th>' + 
                    '<th>'+intervalos[11]+'</th>' +
                    '<th>'+intervalos[12]+'</th>' + 
                    '<th>'+intervalos[13]+'</th>' +
                    '<th> >'+intervalos[13]+'</th>' +
                '</tr>'
    encabezado.innerHTML = titulos
    vectorAcum.innerHTML = vector
}

export function contarLimites(vector,vectorContador,intervalos){
    if (vector[6] <= intervalos[0]){
        vectorContador[0] += 1
        return vectorContador
    }
    if (vector[6] >= intervalos[13]){
        vectorContador[14] += 1
        return vectorContador
    }
    for (let i = 0; i < intervalos.length; i++){
        if (vector[6] <= intervalos[i+1] && vector[6] > intervalos[i]){
            vectorContador[i] += 1
            return vectorContador
        }
    }
}

export function encontrarAcum(vector){
    let nuevo = []
    let suma = 0
    for (let i=0; i<vector.length;i++){
        suma += parseFloat(vector[i])
        nuevo.push((suma * 100).toFixed(2) + '%')
    }
    return nuevo
}

export function caminoCritico(vector, vectorContador){
    let camino1 = vector[4] + (vector[5] - Math.max(vector[2],vector[4]))
    let camino2 = vector[2] + (vector[5] - Math.max(vector[2],vector[4]))
    let camino3 = vector[3]
    let maximo = Math.max(camino1,camino2,camino3)
    if (maximo == camino1){
        vectorContador[0] += 1
        vectorContador[3] += 1
        vectorContador[4] += 1
    }
    else{
        if (maximo == camino2){
            vectorContador[1] += 1
            vectorContador[4] += 1
        }
        else{
            vectorContador[2] += 1
        }
    }
    return vectorContador
}

export function inicioTardio(vector){
    let tardeT5 = vector[6] - (vector[5] - Math.max(vector[2],vector[4]))
    let tardeT3 = vector[6] - vector[3]
    let tardeT2 = tardeT5 - vector[2]
    let tardeT4 = tardeT5 - (vector[4] - vector[1])
    let tardeT1 = tardeT4 - vector[1]
    let tardio = [tardeT1.toFixed(2),tardeT2.toFixed(2),tardeT3.toFixed(2),tardeT4.toFixed(2),tardeT5.toFixed(2)]
    return tardio
}
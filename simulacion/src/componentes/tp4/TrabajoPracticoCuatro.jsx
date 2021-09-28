import React, { useEffect } from 'react';

//Importa componentes de MaterialUI
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Importa la libreria scroll infinito
import InfiniteScroll from 'react-infinite-scroll-component';
// import './tabla.css';

//Importa la logica
import { uniforme, normal, generarVectorEstado, rellenarTabla, scriptPrincipal, desdeHasta, vaciarTabla, obtenerNoventa } from './logicaFunciones';
// import { Histograma } from './histograma/Histograma';

const TrabajoPracticoCuatro = () => {

    /*Variables de DESDE-HASTA */
    const [cantidad, setCantidad] = React.useState(1)

    /*Variables de DESDE-HASTA */
    const [desde, setDesde] = React.useState(1)
    const [hasta, setHasta] = React.useState(1)

    /*Variable de distribucion*/
    const [metodo, setMetodo] = React.useState(0)

    /*Variable de distribucion UNIFORME*/
    const [a, setA] = React.useState(1)
    const [b, setB] = React.useState(1)

    /*Variable de distribucion NORMAL*/
    const [media, setMedia] = React.useState(1)
    const [desvEstandar, setDesvEstandar] = React.useState(1)

    /*Variables de Tabla con scroll infinito*/
    const [lista, setLista] = React.useState([])
    const [scroll, setScroll] = React.useState([])
    const [contador, setContador] = React.useState(0)

    /*variables de chi cuadrado */
    const [intervalos, setIntervalos] = React.useState([])
    const [numerosOrdenados, setNumerosOrdenados] = React.useState([])

    const [desdeHasta, setDesdeHasta] = React.useState(false)


    //Carga valor inicial de la lista en el scroll infinito
    useEffect(() => {
        setScroll(lista.slice(0, contador))
    }, [lista])

    //Carga valor del contador que va a ir mostrando la tabla para traer datos en la lista
    useEffect(() => {
        setContador(prevState => prevState + 3000)
    }, [scroll])

    /* Metodo para setear Semilla, Constante multiplicativa y aditiva */
    const handleChange = () => e => {
        const { name, value } = e.target
        if (name === 'Desde') {
            setDesde(value)
        } else {
            if (name === 'Hasta') {
                setHasta(value)
            }
            else {
                setCantidad(value)
            }
        }
    }

    /* Metodo para setear Select de metodos conguenciales */
    const handleChangeMetodo = (e) => {
        setMetodo(e.target.value)
        // dejarDeListar(setLista);
        setContador(0)
    }

    return (
        <>
            <div >
                <Grid style={{ paddingTop: '20px', flexDirection: "column" }} container direction={'row'} justifyContent={'center'} alignItems={'center'}>
                    <h2>Integrantes</h2>
                    <h3>Andermatten Alexis - Caro Victoria - Rodriguez Milena - Martinez Erik - Sueldo Tomas</h3>
                </Grid>
                {/* Campo de Semilla, Constante multiplicativa y aditiva - INPUTS */}
                <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                    <Grid item xs={4}>
                        <TextField
                            name={'Desde'}
                            value={semilla}
                            style={{ width: '300px' }}
                            label="Desde"
                            type="number"
                            variant="outlined"
                            placeholder={'Ingrese la semilla'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            name={'Hasta'}
                            value={constMultiplicativa}
                            style={{ width: '300px' }}
                            label="Hasta"
                            type="number"
                            defaultValue={1}
                            variant="outlined"
                            placeholder={'Ingrese la constante multiplicativa'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name={'cantidad'}
                            value={constAditiva}
                            style={{ width: '300px' }}
                            label="Cantidad de simulaciones"
                            type="number"
                            defaultValue={1}
                            variant="outlined"
                            placeholder={'Ingrese la constante aditiva'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                </Grid>

                {/* Select para metodos congruenciales */}
                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}  >


                    {/* Menu de botones */}
                    <Grid item style={{ marginTop: '40px' }}>
                        <ButtonGroup variant="contained" color={metodo === 0 ? "primary" : 'secondary'} aria-label="contained primary button group">
                            <Button onClick={() => {
                                scriptPrincipal(cantidad)
                            }}>Simular</Button>

                            <Button onClick={() => {
                                // generar20Numeros(metodo, semilla, constMultiplicativa, constAditiva, 20, setLista)
                                setDesdeHasta(false);
                            }}>Generar 20 numeros</Button>

                            <Button onClick={() => {
                                // listarHastaFinal(metodo, semilla, constMultiplicativa, constAditiva, setLista)
                                setDesdeHasta(false);
                            }}>Listar hasta el final</Button>

                            <Button onClick={() => {
                                // listarDesdeHasta(metodo, semilla, constMultiplicativa, constAditiva, setLista)
                                setDesdeHasta(true);
                            }}
                            >Listar desde/hasta</Button>

                            <Button onClick={() => {
                                // chiCuadrado(metodo, semilla, constAditiva, constMultiplicativa, setIntervalos, setNumerosOrdenados, setLista)
                                setDesdeHasta(false);
                            }}>Hacer test chi cuadrado</Button>
                        </ButtonGroup>
                    </Grid>

                    {/* TABLA PARA CHI CUADRADO*/}
                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        <TableContainer style={{ width: "900px", overflow: "auto" }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Intervalo</TableCell>
                                        <TableCell>fo</TableCell>
                                        <TableCell>fo(AC)</TableCell>
                                        <TableCell>fe</TableCell>
                                        <TableCell>fe(AC)</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>C(AC)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {intervalos.map((item, index) => (
                                        <TableRow key={'index'}>
                                            {/* <TableCell>{obtenerIntervalos(intervalos.length, index)}</TableCell> */}
                                            <TableCell>{item}</TableCell>
                                            {/* <TableCell>{acumularFrecuenciasObservadas(intervalos, index)}</TableCell> */}
                                            {/* <TableCell>{frecEsperada}</TableCell> */}
                                            {/* <TableCell>{(frecEsperada * (index + 1)).toFixed(4)}</TableCell> */}
                                            {/* <TableCell>{calcularChi(intervalos, index)}</TableCell>
                                            <TableCell>{acumularChi(intervalos, index)}</TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    {/* Renderiza el histograma
                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        {numerosOrdenados.length > 0 &&
                            <Histograma
                                data={numerosOrdenados} >
                            </Histograma>}
                    </Grid> */}

                    {/* Reenderiza la tabla con scroll infinito */}
                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        <div style={{ width: "100%", overflowY: "auto !important" }}>
                            <InfiniteScroll
                                dataLength={scroll?.length}
                                next={() => setScroll(lista.slice(0, contador))}
                                hasMore={true}
                            >
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th>N° de orden</th>
                                            <th>Numeros aleatorios</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {scroll?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {!desdeHasta ?
                                                        (index + 1)
                                                        :
                                                        ""
                                                        // contarDesdeHasta(index)
                                                    }
                                                </td>
                                                <td>{item}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </InfiniteScroll>
                        </div>
                    </Grid>
                </Grid>
            </div>

        </>
    )
}

export default TrabajoPracticoCuatro;


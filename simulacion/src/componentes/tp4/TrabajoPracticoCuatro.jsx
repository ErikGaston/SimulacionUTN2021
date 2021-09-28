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
// import { obtenerIntervalos, frecEsperada, acumularFrecuenciasObservadas, chiCuadrado, dejarDeListar, generar20Numeros, listarDesdeHasta, listarHastaFinal, calcularChi, acumularChi, contarDesdeHasta } from './logicaFunciones';
// import { Histograma } from './histograma/Histograma';

const TrabajoPracticoCuatro = () => {

    /*Variables de Metodos congruenciales*/
    const [semilla, setSemilla] = React.useState(1)
    const [metodo, setMetodo] = React.useState(0)
    const [constMultiplicativa, setConstMultiplicativa] = React.useState(1)
    const [constAditiva, setConstAditiva] = React.useState(1)

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
        if (name === 'semilla') {
            if (value > 50000) {
                alert('El valor de la semilla no puede ser mayor a la longitud del generador (50000).');
                setSemilla(1);
            } else {
                setSemilla(value)
            }
        }
        if (name === 'constMultiplicativa') {
            setConstMultiplicativa(value)
        }
        if (name === 'constAditiva') {
            setConstAditiva(value)
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
                <Grid style={{ paddingTop: '20px', flexDirection:"column" }} container direction={'row'} justifyContent={'center'} alignItems={'center'}>
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
                            name={'constAditiva'}
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
                     <Grid item xs={4} style={{ marginTop: '40px' }}>
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">Metodo</InputLabel>
                            <Select
                                label="Metodo"
                                value={metodo}
                                onChange={(e) => handleChangeMetodo(e)}>
                                <MenuItem value={0}>Distribución Uniforme</MenuItem>
                                <MenuItem value={1}>Distribución Normal</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {metodo === 0 ? 
                    <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                        <Grid item xs={4}>
                            <TextField
                                name={'a'}
                                value={semilla}
                                style={{ width: '300px' }}
                                label="a"
                                type="number"
                                variant="outlined"
                                placeholder={'Ingrese la semilla'}
                                onChange={handleChange()}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                            />
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                name={'b'}
                                value={constMultiplicativa}
                                style={{ width: '300px' }}
                                label="b"
                                type="number"
                                defaultValue={1}
                                variant="outlined"
                                placeholder={'Ingrese la constante multiplicativa'}
                                onChange={handleChange()}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                            />
                        </Grid>
                    </Grid>
                    : 
                    <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                        <Grid item xs={4}>
                            <TextField
                                name={'media'}
                                value={semilla}
                                style={{ width: '300px' }}
                                label="media"
                                type="number"
                                variant="outlined"
                                placeholder={'Ingrese la semilla'}
                                onChange={handleChange()}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                            />
                        </Grid> 
                        <Grid item xs={4}>
                            <TextField
                                name={'desviacionEstandar'}
                                value={constMultiplicativa}
                                style={{ width: '300px' }}
                                label="desviacion Estandar"
                                type="number"
                                defaultValue={1}
                                variant="outlined"
                                placeholder={'Ingrese la constante multiplicativa'}
                                onChange={handleChange()}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                            />
                        </Grid>
                    </Grid>
                    }
                    {/* Menu de botones */}
                    <Grid item style={{ marginTop: '40px' }}>
                        <ButtonGroup variant="contained" color={metodo === 0 ? "primary" : 'secondary'} aria-label="contained primary button group">
                            <Button onClick={() => {
                                // dejarDeListar(setLista)
                                setDesdeHasta(false);
                            }}>Simular</Button>

                            <Button onClick={() => {
                                // listarDesdeHasta(metodo, semilla, constMultiplicativa, constAditiva, setLista)
                                setDesdeHasta(true);
                            }}
                            >Desde/hasta</Button>

                            <Button onClick={() => {
                                // chiCuadrado(metodo, semilla, constAditiva, constMultiplicativa, setIntervalos, setNumerosOrdenados, setLista)
                                setDesdeHasta(false);
                            }}>Obtener fecha de probabilidad 90%</Button>
                        </ButtonGroup>
                    </Grid>
                    {/* TABLA PARA CHI CUADRADO*/}
                    <Grid container direction={'row'} justifyContent={'space-between'}>
                        <Grid item xs={7}>
                            <Grid item style={{ display: 'flex', marginTop: '50px' }} xs={12} >
                                <TableContainer style={{ overflow: "auto" }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >#</TableCell>
                                                <TableCell>T1</TableCell>
                                                <TableCell>T2</TableCell>
                                                <TableCell>T3</TableCell>
                                                <TableCell>T4</TableCell>
                                                <TableCell>T5</TableCell>
                                                <TableCell>Tiempo Total</TableCell>
                                                <TableCell>Tiempo Promedio</TableCell>
                                                <TableCell>Maximo</TableCell>
                                                <TableCell>Minimo</TableCell>
                                                <TableCell>Probabilidad(45)</TableCell>
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

                        </Grid>
                        <Grid item xs={4}>
                        <Grid item style={{ display: 'flex', marginTop: '50px' }} xs={12} >
                                <TableContainer style={{ overflow: "auto" }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell >#</TableCell>
                                                <TableCell>Lim Inferior</TableCell>
                                                <TableCell>Lim Superior</TableCell>
                                                <TableCell>F. Observada</TableCell>
                                                <TableCell>Probabilidad</TableCell>
                                                <TableCell>Probabilidad Acumulada</TableCell>
                                               
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
                        </Grid>
                    </Grid>

                    {/* Renderiza el histograma
                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        {numerosOrdenados.length > 0 &&
                            <Histograma
                                data={numerosOrdenados} >
                            </Histograma>}
                    </Grid> */}

                </Grid>
            </div>

        </>
    )
}

export default TrabajoPracticoCuatro;


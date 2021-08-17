import React, { useEffect } from 'react';
//material-ui
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

import InfiniteScroll from 'react-infinite-scroll-component';
import './tabla.css';

//logica
import { frecEsperada, acumularFrecuenciasObservadas, chiCuadrado, dejarDeListar, generar20Numeros, listarDesdeHasta, listarHastaFinal, calcularChi, acumularChi } from './logicaFunciones';
import { Histograma } from './histograma/Histograma';

const TrabajoPracticoUno = () => {

    const [semilla, setSemilla] = React.useState(1)
    const [metodo, setMetodo] = React.useState(0)
    const [constMultiplicativa, setConstMultiplicativa] = React.useState(1)
    const [constAditiva, setConstAditiva] = React.useState(1)
    const [lista, setLista] = React.useState([])
    const [scroll, setScroll] = React.useState([])
    const [contador, setContador] = React.useState(0)

    /*variables de chi cuadrado */
    const [intervalos, setIntervalos] = React.useState([])
    const [frecObservadaAcumulada, setFrecObservadaAcumulada] = React.useState(0)

    useEffect(() => {
        setScroll(lista.slice(0, contador))
    }, [lista])

    useEffect(() => {
        setContador(prevState => prevState + 1000)
    }, [scroll])

    const handleChangeMetodo = (e) => {
        setMetodo(e.target.value)
        dejarDeListar(setLista);
        setContador(0)
    }

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

    const acumularFrecuenciaObservada = (item) => {
        setFrecObservadaAcumulada(prevState => prevState + item)
        return frecObservadaAcumulada;
    }

    return (
        <>
            <div >
                <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                    <Grid item xs={4}>
                        <TextField
                            name={'semilla'}
                            value={semilla}
                            style={{ width: '300px' }}
                            label="Semilla"
                            type="number"
                            variant="outlined"
                            placeholder={'Ingrese la semilla'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            name={'constMultiplicativa'}
                            value={constMultiplicativa}
                            style={{ width: '300px' }}
                            label="Constante multiplicativa"
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
                            label="Constante aditiva"
                            type="number"
                            defaultValue={1}
                            variant="outlined"
                            placeholder={'Ingrese la constante aditiva'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                </Grid>
                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}  >
                    <Grid item xs={4} style={{ marginTop: '40px' }}>
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">Metodo</InputLabel>
                            <Select
                                label="Metodo"
                                value={metodo}
                                onChange={(e) => handleChangeMetodo(e)}
                            >
                                <MenuItem value={0}>Método de Congruencia Multiplicativos</MenuItem>
                                <MenuItem value={1}>Método de Congruencia Mixto</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item style={{ marginTop: '40px' }}>
                        <ButtonGroup variant="contained" color={metodo === 0 ? "primary" : 'secondary'} aria-label="contained primary button group">
                            <Button onClick={() => dejarDeListar(setLista)}>Dejar de Listar</Button>
                            <Button onClick={() => generar20Numeros(metodo, semilla, constMultiplicativa, constAditiva, 20, setLista)}>Generar 20 numeros</Button>
                            <Button onClick={() => listarHastaFinal(metodo, semilla, constMultiplicativa, constAditiva, setLista)}>Listar hasta el final</Button>
                            <Button onClick={() => listarDesdeHasta(metodo, semilla, constMultiplicativa, constAditiva, setLista)}>Listar desde/hasta</Button>
                            <Button onClick={() => chiCuadrado(metodo, semilla, constAditiva, constMultiplicativa, setIntervalos)}>Hacer test chi cuadrado</Button>
                        </ButtonGroup>
                    </Grid>


                    {/* TABLA PARA CHI CUADRADO*/}
                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        <TableContainer style={{ width: "900px", height: "400px", overflow: "auto" }}>
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
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item}</TableCell>
                                            <TableCell>{acumularFrecuenciasObservadas(intervalos, index)}</TableCell>
                                            <TableCell>{frecEsperada}</TableCell>
                                            <TableCell>{(frecEsperada * (index + 1)).toFixed(4)}</TableCell>
                                            <TableCell>{calcularChi(intervalos, index)}</TableCell>
                                            <TableCell>{acumularChi(intervalos, index)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        {/* Estilos de tabla que faltan*/}
                        <div style={{height: "300px", overflowY: "auto !important" }}>
                            <table style={{ width: "100%"}}>
                                <thead>
                                    <tr>
                                        <th>N° de orden</th>
                                        <th>Numeros aleatorios</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <InfiniteScroll
                                        dataLength={scroll.length}
                                        next={() => setScroll(lista.slice(0, contador))}
                                        hasMore={true}
                                    >
                                        {scroll.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item}</td>
                                            </tr>
                                        ))}
                                    </InfiniteScroll>
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Histograma
                data={intervalos} >
            </Histograma>
        </>
    )
}

export default TrabajoPracticoUno;


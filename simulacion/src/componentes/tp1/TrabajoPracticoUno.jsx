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

import InfiniteScroll from 'react-infinite-scroll-component';
import './tabla.css';

//logica
import { dejarDeListar, generar20Numeros, listarDesdeHasta, listarHastaFinal, validarNumeros } from './logicaFunciones';
import { Histograma } from './Histograma';

const TrabajoPracticoUno = () => {

    const [semilla, setSemilla] = React.useState(1)
    const [metodo, setMetodo] = React.useState(0)
    const [constMultiplicativa, setConstMultiplicativa] = React.useState(1)
    const [constAditiva, setConstAditiva] = React.useState(1)
    const [lista, setLista] = React.useState([])
    const [scroll, setScroll] = React.useState([])
    const [contador, setContador] = React.useState(0)

    useEffect(() => {
        setScroll(lista.slice(0, contador))
    }, [lista])

    useEffect(() => {
        setContador(prevState => prevState + 5000)
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
                        </ButtonGroup>
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                        {/* Estilos de tabla que faltan*/}
                        <div>
                            <InfiniteScroll
                                dataLength={scroll.length}
                                next={() => setScroll(lista.slice(0, contador))}
                                hasMore={true}
                            >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>N° de orden</th>
                                            <th>Numeros aleatorios</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {scroll.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
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
            <Histograma></Histograma>
        </>
    )
}

export default TrabajoPracticoUno;

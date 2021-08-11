import React from 'react';
//material-ui
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InfiniteScroll from 'react-infinite-scroll-component';
//logica
import { dejarDeListar, generar20Numeros, listarDesdeHasta, listarHastaFinal } from './logicaFunciones';

const TrabajoPracticoUno = () => {

    const [semilla, setSemilla] = React.useState(1)
    const [metodo, setMetodo] = React.useState(0)
    const [constMultiplicativa, setConstMultiplicativa] = React.useState(1)
    const [constAditiva, setConstAditiva] = React.useState(1)
    const [desde, setDesde] = React.useState(1)
    const [hasta, setHasta] = React.useState(100)
    const [lista, setLista] = React.useState([])

    const handleChangeMetodo = (e) => {
        setMetodo(e.target.value)
    }

    const handleChange = () => e => {
        const { name, value } = e.target
        if (name === 'semilla') {
            setSemilla(value)
        }
        if (name === 'constMultiplicativa') {
            setConstMultiplicativa(value)
        }
        if (name === 'constAditiva') {
            setConstAditiva(value)
        }
    }

    return (
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
                        <Button onClick={() => listarDesdeHasta(desde, hasta)}>Listar desde/hasta</Button>
                    </ButtonGroup>
                </Grid>
                {/* <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                    <List style={{ width: "150px", overflow: 'auto' }} >
                        {lista.map((item, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={item}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid> */}
                {/* <Grid item style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }} xs={12} >
                    <TableContainer style={{ width: "600px", height: "400px", overflow: "auto" }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>N° de orden</TableCell>
                                    <TableCell>Numeros aleatorios</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {lista.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{item}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid> */}
                <InfiniteScroll
                    dataLength={lista.length}
                >
                    {lista.map((_, index) => (
                    <div  key={index}>
                        div - #{index}
                    </div>
                    ))}
                </InfiniteScroll>
            </Grid>

        </div>
    )
}

export default TrabajoPracticoUno;

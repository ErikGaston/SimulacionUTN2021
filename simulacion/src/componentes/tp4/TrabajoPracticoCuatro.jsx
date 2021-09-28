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

/*Estilos de tabla*/
import './tabla.css';

//Importa la logica de funciones
import { uniforme, normal, generarVectorEstado, rellenarTabla, scriptPrincipal, desdeHasta, vaciarTabla, obtenerNoventa, generarVectorEstado2 } from './logicaFunciones';

const TrabajoPracticoCuatro = () => {

    //Distrubuciones
    const [t1, setT1] = React.useState({
        metodo:0,
        a:1,
        b:2,
        media:3,
        desviacion:4 
    })
    const [t2, setT2] = React.useState({
        metodo:1,
        a:1,
        b:2,
        media:3,
        desviacion:4 
    })
    const [t3, setT3] = React.useState({
        metodo:2,
        a:1,
        b:2,
        media:3,
        desviacion:4 
    })

    //generarVectorEstado2(t1,t2,t3)();

    /*Variables de Cantidad de simulaciones */
    const [cantidad, setCantidad] = React.useState(1)

    /*Variables de DESDE-HASTA */
    const [desde, setDesde] = React.useState(1)
    const [hasta, setHasta] = React.useState(1)

    /*Variable de distribucion*/
    const [distribuciones, setDistribuciones] = React.useState(0)

    /*Variable de distribucion UNIFORME*/
    const [a, setA] = React.useState(1)
    const [b, setB] = React.useState(1)

    /*Variable de distribucion NORMAL*/
    const [media, setMedia] = React.useState(1)
    const [desvEstandar, setDesvEstandar] = React.useState(1)

    /* Metodo para setear Desde, Hasta y Cantidad de simulaciones */
    const handleChange = () => e => {
        const { name, value } = e.target
        switch (name) {
            case 'Desde':
                setDesde(value)
                break;
            case 'Hasta':
                setHasta(value)
                break;
            case 'Cantidad':
                setCantidad(value)
                break;
            case 'a':
                setA(value)
                break;
            case 'b':
                setB(value)
                break;
            case 'Media':
                setMedia(value)
                break;
            case 'DesvEstandar':
                setDesvEstandar(value)
                break;
        }
    }

    /* Metodo para setear Select de distribuciones */
    const handleChangeDistribuciones = (e) => {
        setDistribuciones(e.target.value)
    }

    return (
        <>
            <div >
                <Grid style={{ paddingTop: '20px', flexDirection: "column" }} container direction={'row'} justifyContent={'center'} alignItems={'center'}>
                    <h2>Integrantes</h2>
                    <h3>Andermatten Alexis - Caro Victoria - Rodriguez Milena - Martinez Erik - Sueldo Tomas</h3>
                </Grid>
                {/* Campo de Desde, Hasta, Cantidad, Uniforme y Normal - INPUTS */}
                <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                    <Grid item xs={4}>
                        <TextField
                            name={'Desde'}
                            value={desde}
                            style={{ width: '300px' }}
                            label="Desde"
                            type="number"
                            variant="outlined"
                            placeholder={'Ingrese valor de Desde'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            name={'Hasta'}
                            value={hasta}
                            style={{ width: '300px' }}
                            label="Hasta"
                            type="number"
                            defaultValue={1}
                            variant="outlined"
                            placeholder={'Ingrese valor de Hasta'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            name={'Cantidad'}
                            value={cantidad}
                            style={{ width: '300px' }}
                            label="Cantidad de simulaciones"
                            type="number"
                            defaultValue={1}
                            variant="outlined"
                            placeholder={'Ingrese la cantidad de simulaciones'}
                            onChange={handleChange()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                </Grid>

                {/* Select para metodos congruenciales */}
                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}  >
                    <Grid item xs={4} style={{ marginTop: '40px' }}>
                        <FormControl variant="outlined" >
                            <InputLabel id="demo-simple-select-outlined-label">Distribuciones</InputLabel>
                            <Select
                                label="Distribuciones"
                                value={distribuciones}
                                onChange={(e) => handleChangeDistribuciones(e)}>
                                <MenuItem value={0}>Distribución Uniforme</MenuItem>
                                <MenuItem value={1}>Distribución Normal</MenuItem>
                                <MenuItem value={2}>Distribución Exponencial</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {distribuciones === 0 ?
                        <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                            <Grid item xs={4}>
                                <TextField
                                    name={'a'}
                                    value={a}
                                    style={{ width: '300px' }}
                                    label="a"
                                    type="number"
                                    variant="outlined"
                                    placeholder={'Ingrese valor de A'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name={'b'}
                                    value={b}
                                    style={{ width: '300px' }}
                                    label="b"
                                    type="number"
                                    defaultValue={1}
                                    variant="outlined"
                                    placeholder={'Ingrese valor de B'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                                />
                            </Grid>
                        </Grid>
                        : distribuciones === 1 ?
                        <Grid style={{ paddingTop: '20px' }} container direction={'row'} justifyContent={'center'} alignItems={'center'} >
                            <Grid item xs={4}>
                                <TextField
                                    name={'Media'}
                                    value={media}
                                    style={{ width: '300px' }}
                                    label="Media"
                                    type="number"
                                    variant="outlined"
                                    placeholder={'Ingrese valor de Media'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    name={'DesvEstandar'}
                                    value={desvEstandar}
                                    style={{ width: '300px' }}
                                    label="Desviacion Estandar"
                                    type="number"
                                    defaultValue={1}
                                    variant="outlined"
                                    placeholder={'Ingrese valor de Desviacion Estandar'}
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
                                    value={a}
                                    style={{ width: '300px' }}
                                    label="Media"
                                    type="number"
                                    variant="outlined"
                                    placeholder={'Ingrese valor de la Media'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                                />
                            </Grid>
                        </Grid>
                    }

                    {/* Menu de botones */}
                    <Grid item style={{ marginTop: '40px' }}>
                        <ButtonGroup variant="contained" color={distribuciones === 0 ? "primary" : 'secondary'} aria-label="contained primary button group">
                            <Button onClick={() => scriptPrincipal(cantidad)}>Simular</Button>
                            <Button onClick={() => generarVectorEstado2(t1,t2,t3)}>Simular Nuevo</Button>
                            <Button onClick={() => desdeHasta(desde, hasta)}>Desde/hasta</Button>
                            <Button onClick={() => obtenerNoventa()}>Obtener fecha de probabilidad 90%</Button>
                        </ButtonGroup>
                    </Grid>

                    {/* TABLA DE SIMULACIONES */}
                    <Grid container direction={'row'} justifyContent={'space-between'} >
                        <Grid item xs={7}>
                            <Grid item style={{ display: 'flex', marginTop: '50px' }} xs={12} >
                                <TableContainer style={{ overflow: "auto" }}>
                                    <Table stickyHeader aria-label="sticky table" >
                                        <TableHead>
                                            <TableRow id={'tableRow'}>
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
                                                <TableCell>Contar Proporcion</TableCell>
                                                <TableCell>Probabilidad(45)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id="cuerpoTabla">
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>

                        {/* TABLA DE FRECUENCIAS */}
                        <Grid item xs={4}>
                            <Grid item style={{ display: 'flex', marginTop: '50px' }} xs={12} >
                                <TableContainer style={{ overflow: "auto" }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow id={'tableRow'}>
                                                <TableCell >#</TableCell>
                                                <TableCell>Lim Inferior</TableCell>
                                                <TableCell>Lim Superior</TableCell>
                                                <TableCell>F. Observada</TableCell>
                                                <TableCell>Probabilidad</TableCell>
                                                <TableCell>Probabilidad Acumulada</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id="cuerpoTabla2">
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        </>
    )
}

export default TrabajoPracticoCuatro;


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
import { Typography } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

/*Estilos de tabla*/
import './tabla.css';

//Importa la logica de funciones
import { scriptPrincipal, desdeHasta, scriptPrincipal2, datos, desdeHasta2 } from './logicaFunciones';

const TrabajoPracticoCuatro = () => {
    const [data, setData] = React.useState([]);
    
    //Distrubuciones
    const [t1, setT1] = React.useState({
        metodo: 0,
        a: 0,
        b: 0,
        media: 0,
        desviacion: 0
    })
    const [t2, setT2] = React.useState({
        metodo: 0,
        a: 0,
        b: 0,
        media: 0,
        desviacion: 0,
    })
    const [t3, setT3] = React.useState({
        metodo: 0,
        a: 0,
        b: 0,
        media: 0,
        desviacion: 0,
    })
    const [t4, setT4] = React.useState({
        metodo: 0,
        a: 0,
        b: 0,
        media: 0,
        desviacion: 0
    })
    const [t5, setT5] = React.useState({
        metodo: 0,
        a: 0,
        b: 0,
        media: 0,
        desviacion: 0
    })

    const variables = (setVariable, variable, titulo) => {

        const handleChange = () => e => {
            const { name, value } = e.target;
            setVariable(data => ({ ...data, [name]: parseInt(value) }))
        }

        return (
            <Grid style={{ paddingTop: '20px' }} container direction={'row'} alignItems={'center'}>
                <Grid item xs={1}>
                    <Typography style={{ marginLeft: '50%', fontWeight: 600 }}>{titulo}:</Typography>
                </Grid>
                <Grid item xs={4} >
                    <FormControl variant="outlined" >
                        <InputLabel id="demo-simple-select-outlined-label">Distribuciones</InputLabel>
                        <Select
                            label="Distribuciones"
                            value={variable.metodo}
                            onChange={(e) => setVariable(data => ({ ...data, metodo: e.target.value }))}>
                            <MenuItem value={0}>Distribución Uniforme</MenuItem>
                            <MenuItem value={1}>Distribución Normal</MenuItem>
                            <MenuItem value={2}>Distribución Exponencial</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {variable.metodo === 0 ?
                    <>
                        <Grid item xs={3}>
                            <TextField
                                name={'a'}
                                value={variable.a}
                                style={{ width: '300px' }}
                                label="a"
                                type="number"
                                variant="outlined"
                                placeholder={'Ingrese valor de A'}
                                onChange={handleChange()}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                name={'b'}
                                value={variable.b}
                                style={{ width: '300px' }}
                                label="b"
                                type="number"
                                variant="outlined"
                                placeholder={'Ingrese valor de B'}
                                onChange={handleChange()}
                                onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                            />
                        </Grid>
                    </>
                    : variable.metodo === 1 ?
                        <>
                            <Grid item xs={3}>
                                <TextField
                                    name={'media'}
                                    value={variable.media}
                                    style={{ width: '300px' }}
                                    label="Media"
                                    type="number"
                                    variant="outlined"
                                    placeholder={'Ingrese valor de Media'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    name={'desviacion'}
                                    value={variable.desviacion}
                                    style={{ width: '300px' }}
                                    label="Desviacion Estandar"
                                    type="number"
                                    //defaultValue={1}
                                    variant="outlined"
                                    placeholder={'Ingrese valor de Desviacion Estandar'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}

                                />
                            </Grid>
                        </>
                        :
                        <>
                            <Grid item xs={3}>
                                <TextField
                                    name={'media'}
                                    value={variable.media}
                                    style={{ width: '300px' }}
                                    label="Media"
                                    type="number"
                                    variant="outlined"
                                    placeholder={'Ingrese valor de la Media'}
                                    onChange={handleChange()}
                                    onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                                />
                            </Grid>
                        </>
                }
            </Grid>
        )
    }

    /*Variables de Cantidad de simulaciones */
    const [cantidad, setCantidad] = React.useState(1)

    /*Variables de DESDE-HASTA */
    const [desde, setDesde] = React.useState(1)
    const [hasta, setHasta] = React.useState(1)

    /* Metodo para setear Desde, Hasta y Cantidad de simulaciones */
    const handleChange2 = () => e => {
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
        }
    }
    return (
        <>
            <div>
                <Grid style={{ paddingTop: '30px', marginBottom: '30px', flexDirection: "column" }} container direction={'row'} justifyContent={'center'} alignItems={'center'}>
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
                            onChange={handleChange2()}
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
                            onChange={handleChange2()}
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
                            onChange={handleChange2()}
                            onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1'); }}
                        />
                    </Grid>
                </Grid>

                {/* Select para metodos congruenciales */}
                <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'}  >

                    {variables(setT1, t1, "T1")}
                    {variables(setT2, t2, "T2")}
                    {variables(setT3, t3, "T3")}
                    {variables(setT4, t4, "T4")}
                    {variables(setT5, t5, "T5")}

                    {/* Menu de botones */}
                    <Grid item   style={{ marginTop: '40px' }}>
                        <ButtonGroup variant="contained" color={"primary"} aria-label="contained primary button group">
                            <Button onClick={() => scriptPrincipal(cantidad, setData)}>Simular</Button>
                            <Button onClick={() => scriptPrincipal2(cantidad, t1, t2, t3, t4, t5)}>Simular Distribucion</Button>
                            <Button onClick={() => desdeHasta(desde, hasta)}>Desde/hasta</Button>
                            <Button onClick={() => desdeHasta2(desde, hasta, t1, t2, t3, t4, t5)}>Desde/hasta-Distribucion</Button>
                        </ButtonGroup>
                    </Grid>
                    {/* INTERVALOS DE CONFIANZA */}
                    <Grid item xs={12}>
                            <Grid item style={{ display: 'flex', marginTop: '50px' }} xs={12} >
                                <TableContainer style={{ overflow: "auto" }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow id="vectorAcum">
                                                <TableCell>L1</TableCell>
                                                <TableCell>L2</TableCell>
                                                <TableCell>L3</TableCell>
                                                <TableCell>L4</TableCell>
                                                <TableCell>L5</TableCell>
                                                <TableCell>L6</TableCell>
                                                <TableCell >L7</TableCell>
                                                <TableCell>L8</TableCell>
                                                <TableCell>L9</TableCell>
                                                <TableCell>L10</TableCell>
                                                <TableCell>L11</TableCell>
                                                <TableCell>L12</TableCell>
                                                <TableCell>L13</TableCell>
                                                <TableCell>L14</TableCell>
                                                <TableCell>L15</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id="cuerpoVector">
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    {/* TABLA DE SIMULACIONES */}
                    <Grid container direction={'row'} justifyContent={'space-between'} >
                        <Grid item xs={12}>
                            <Grid item style={{ display: 'flex', maxHeight:'400px', marginTop: '50px' }} xs={12} >
                                <TableContainer style={{ overflow: "auto" }}>
                                    <Table stickyHeader aria-label="sticky table" >
                                        <TableHead id= "TableHead">
                                            <TableRow id={'tableRow'}>
                                                <TableCell >#</TableCell>
                                                <TableCell>T1</TableCell>
                                                <TableCell>T2</TableCell>
                                                <TableCell>T3</TableCell>
                                                <TableCell>T4</TableCell>
                                                <TableCell>T5</TableCell>
                                                <TableCell>Tiempo Total</TableCell>
                                                <TableCell>Tiempo Promedio</TableCell>
                                                <TableCell>Varianza</TableCell>
                                                <TableCell>Confianza</TableCell>
                                                <TableCell>Maximo</TableCell>
                                                <TableCell>Minimo</TableCell>
                                                <TableCell>Contar Proporcion</TableCell>
                                                <TableCell>Probabilidad(45)</TableCell>
                                                <TableCell>L1</TableCell>
                                                <TableCell>L2</TableCell>
                                                <TableCell>L3</TableCell>
                                                <TableCell>L4</TableCell>
                                                <TableCell>L5</TableCell>
                                                <TableCell>L6</TableCell>
                                                <TableCell >L7</TableCell>
                                                <TableCell>L8</TableCell>
                                                <TableCell>L9</TableCell>
                                                <TableCell>L10</TableCell>
                                                <TableCell>L11</TableCell>
                                                <TableCell>L12</TableCell>
                                                <TableCell>L13</TableCell>
                                                <TableCell>L14</TableCell>
                                                <TableCell>L15</TableCell>
                                                <TableCell>C. A1</TableCell>
                                                <TableCell>C. A2</TableCell>
                                                <TableCell>C. A3</TableCell>
                                                <TableCell>C. A4</TableCell>
                                                <TableCell>C. A5</TableCell>
                                                <TableCell>Tarde A1</TableCell>
                                                <TableCell>Tarde A2</TableCell>
                                                <TableCell>Tarde A3</TableCell>
                                                <TableCell>Tarde A4</TableCell>
                                                <TableCell>Tarde A5</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id="cuerpoTabla">
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div id='cont'>
                
            </div>
            <Line
                style={{marginTop:'50px'}}
                id='MyChart'
                height="100"
                width="400"
                data={{
                    labels: data.map((item, index) => {
                        return index;
                    }),
                    datasets: [
                        {
                            label: 'Tiempo Promedio',
                            fill: false,
                            lineTension: 0.5,
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: datos
                        }
                    ]
                }}
            ></Line>
        </>
    )
}

export default TrabajoPracticoCuatro;


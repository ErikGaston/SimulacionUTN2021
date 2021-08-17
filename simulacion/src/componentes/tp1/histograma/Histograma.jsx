import Chart from 'react-google-charts'
import { cantidadIntervalos } from '../logicaFunciones';
import { Graph } from './styles'

export function Histograma({ data }) {
    const newData = data.map((data) => (
        ['Frecuencias', data.toString()]
    ));
    const intervalo = 1 / cantidadIntervalos;

    return (
        <Graph>
            <Chart
                chartType="Histogram"
                width="100%"
                height="400px"
                loader={'Loading'}
                data={newData}
                options={{
                    legend: 'none',
                    vAxis: { title: 'Frecuencias' },
                    hAxis: { title: 'Intervalos' },
                    histogram: { hideBucketItems: true, bucketSize: intervalo, maxNumBuckets: 20, maxValue: 1},
                    backgroundColor: '#FFFFFF',
                }}
            />
        </Graph>
    )
}

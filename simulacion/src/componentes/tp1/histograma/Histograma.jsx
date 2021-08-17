import { useState } from 'react';
import Chart from 'react-google-charts'
import { Graph } from './styles'

const chartProbData = [
    ['Frecuencias', '0.1'],
    ['Frecuencias', '0.5'],
    ['Frecuencias', '0.2'],
    ['Frecuencias', '0.8'],
    ['Frecuencias', '0.1'],
    ['Frecuencias', '0.5'],
    ['Frecuencias', '0.2'],
    ['Frecuencias', '0.8'],
    ['Frecuencias', '0.8'],
    ['Frecuencias', '0.8'],
    ['Frecuencias', '0.1'],
]
export function Histograma({ data }) {
    const [cambioData, setCambioData] = useState([])
    console.log('Histograma', data);
    const newData = data.map(data => setCambioData([...cambioData, 'Frecuencias', data.toString()]))
    const intervalo = 1 / data.length;
    console.log(intervalo)
    console.log(newData)

    return (
        <Graph>
            <Chart
                chartType="Histogram"
                width="100%"
                height="200px"
                loader={'Loading'}
                data={chartProbData}
                options={{
                    legend: 'none',
                    vAxis: { title: 'Frecuencias' },
                    hAxis: { title: 'Intervalos' },
                    histogram: { hideBucketItems: true, bucketSize: intervalo, maxNumBuckets: 1000, minValue: 0, },
                    backgroundColor: '#FFFFFF',
                }}
            />
        </Graph>
    )

}

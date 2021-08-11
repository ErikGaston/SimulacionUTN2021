import Histogram from 'react-chart-histogram';

export function Histograma() {
    const labels = ['2016', '2017', '2018']; // valores en X

    const data = [324, 45, 672]; //Valores en Y

    const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };

    return (
        <div>
            <Histogram
                xLabels={labels}
                yValues={data}
                width='200'
                height='200'
                options={options}
            />
        </div >
    )

}


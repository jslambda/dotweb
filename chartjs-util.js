const zip = (a, b) => a.map((e, i) => [e, b[i]]);
const chartColors = {
    red: "rgb(255, 99, 132)",
    orange: "rgb(255, 159, 64)", yellow: "rgb(255, 205, 86)",
    green: "rgb(75, 192, 192)", blue: "rgb(54, 162, 235)",
    grey: "rgb(201, 203, 207)",
    purple: "rgb(153, 102, 255)",
};

const mkLineChartConfig = function () {
   
    const config = {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: chartColors.red,
                borderColor: chartColors.red,
                fill: false,
                data: [
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Line Chart'
            },
            scales: {
                xAxes: [{
                    display: true,
                }],
                yAxes: [{
                    display: true,
                    //type: 'logarithmic',
                }]
            }
        }
    };
    return config;
}

const aggregateChartConfig = function (conf1, conf2, fallbackVal = 0) {
    const result = mkLineChartConfig();
    // JS sets should preserve the insertion order: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    const labelSet = new Set([...conf1.data.labels, ...conf2.data.labels].sort((a, b) => a - b));
    const data1 = [];
    const data2 = [];

    for (let label of labelSet) {
        const i1 = conf1.data.labels.indexOf(label);
        const d1 = (i1 == -1) ? fallbackVal : conf1.data.datasets[0].data[i1];
        data1.push(d1);
        
        const i2 = conf2.data.labels.indexOf(label);
        const d2 = (i2 == -1) ? fallbackVal : conf2.data.datasets[0].data[i2];
        data2.push(d2);
    }

    result.data.labels = [...labelSet];
    result.data.datasets[0].data = data1;
    result.data.datasets.push({
        label: 'My Second dataset',
        backgroundColor: chartColors.green,
        borderColor: chartColors.green,
        fill: false,
        data: data2
    })
    return result;
}

exports.mkLineChartConfig = mkLineChartConfig;
exports.aggregateChartConfig = aggregateChartConfig;
exports.chartColors = chartColors;
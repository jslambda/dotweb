
import {Wiki, mkLineChartConfig} from "../wiki";

async function addCharts(chartMap: Map<string, any>) {
    const r1 = await (new Wiki().filterArticles("climate_change")).evaluate();
    const r2 = await (new Wiki().filterArticles("global_warming")).evaluate();
    
    const c1 = mkLineChartConfig();
    c1.data.labels = r1.map(e=>e.timestamp.getMonth());
    c1.data.datasets[0].data = r1.map(e=>e.views);
    
    const c2 = mkLineChartConfig();
    c2.data.labels = r2.map(e=>e.timestamp.getMonth());
    c2.data.datasets[0].data = r2.map(e=>e.views);

    chartMap["c1"] = c1;
    chartMap["c2"] = c2;         
}

export { addCharts };




const util = require('util');
const axios = require('axios');

class WikiEntry {
    article: string;
    numberOfViews: number
    timestamp: Date

    constructor(article, numberOfViews, timestamp) {
        this.article = article;
        this.numberOfViews = numberOfViews;
        this.timestamp = timestamp;
    }
}

function translateDateToString(d: Date): string {
    const incMonth = d.getMonth() + 1;
    const incDay = d.getDay() + 1;
    const month = incMonth < 10 ? "0" + incMonth : incMonth.toString();
    const day = incDay < 10 ? "0" + incDay : incDay.toString();
    return `${d.getFullYear()}${month}${day}`;
}

function translateStringToDate(d: string): Date {
    if (d.length != 10) {
        return null;
    }
    const result = new Date();
    const year = parseInt(d.substring(0, 4));
    if (isNaN(year)) {
        return null;
    }
    const month = parseInt(d.substring(4, 6));
    if (isNaN(month)) {
        return null;
    }

    result.setFullYear(year);
    result.setMonth(month);
    return result;

}

function getReqPromise(getUrl) {
    // TODO: caching
    return axios.get(getUrl);
}

function translateReqPromise(promise) {
    // response.data
    // {
    //     items: [
    //       {
    //         project: 'en.wikipedia',
    //         article: 'apple',
    //         granularity: 'monthly',
    //         timestamp: '2020020100',
    //         access: 'all-access',
    //         agent: 'all-agents',
    //         views: 47
    //       }, ...]}

    return promise.then(response => {
        return response.data.items.map(item => new WikiEntry(item.article, item.views, translateStringToDate(item.timestamp)));
    });
}

class Wiki {
    articles: Set<string> = new Set();
    startDate: Date;
    endDate: Date;

    entries: WikiEntry[] = [];

    constructor() { }

    filterArticles(...articles: string[]) {
        for (let article of articles) {
            this.articles.add(article);
        }
        return this;
    }

    filterDates(start: Date, end: Date) {
        this.startDate = start;
        this.endDate = end;
        return this;
    }

    sort() {
        return this;
    }

    // Returns one promise per request
    getEntryPromises() {
        const reqPat = "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article" +
            "/en.wikipedia.org/all-access/all-agents/%s/monthly/%s/%s";
        if (true) {
            if (this.articles == null) {
                return;
            }
            if (this.endDate == null) {
                this.endDate = new Date()
            }
            if (this.startDate == null) {
                this.startDate = new Date("2020"); // TODO: compute based on end date
            }
            const requests = Array.from(this.articles).map(a => util.format(reqPat, a, translateDateToString(this.startDate), translateDateToString(this.endDate)));
            return requests.map(r => getReqPromise(r)).map(prom => translateReqPromise(prom));
        }
    }

    async evaluate() {
        const result = await Promise.all(this.getEntryPromises());
        return result.flat();
    }

}

exports.Wiki = Wiki;
exports.mkLineChartConfig = function () {
    const chartColors = {
        red: "rgb(255, 99, 132)", orange: "rgb(255, 159, 64)", yellow: "rgb(255, 205, 86)", green: "rgb(75, 192, 192)", blue: "rgb(54, 162, 235)",
        grey: "rgb(201, 203, 207)",
        purple: "rgb(153, 102, 255)",
    };
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
                text: 'Chart.js Line Chart - Logarithmic'
            },
            scales: {
                xAxes: [{
                    display: true,
                }],
                yAxes: [{
                    display: true,
                    type: 'logarithmic',
                }]
            }
        }
    };
    return config;
}
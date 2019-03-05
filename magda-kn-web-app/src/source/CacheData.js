export default class CacheData {
    constructor() {
        this.getDataSource();
    }
    getDataSource() {
        console.log("load data ... ");
        fetch(API.baseUrl + API.dataSetOrg)
            .then(response => {
                // console.log(response)
                if (response.status === 200) {
                    return response.json();
                } else console.log("Get data error ");
            })
            .then(json => {
                this.organizeDataSource(json);
            })
            .catch(error => {
                console.log("error on .catch", error);
            });
    }

    organizeDataSource(data) {
        //Source map id as key, souce object as value
        let sourceMap = new Map();
        let sourcePublisherMap = new Map();
        data.records.map(record => {
            if (!sourceMap.has(record.aspects.source.name))
                sourceMap.set(
                    record.aspects.source.name,
                    record.aspects.source
                );
            let publisherArray =
                sourcePublisherMap.get(record.aspects.source.name) || [];
            publisherArray.push(record);
            sourcePublisherMap.set(record.aspects.source.name, publisherArray);
            return null;
        });
        this.setState({
            datasource: sourceMap,
            sourcePublisherMap: sourcePublisherMap
        });
    }
}

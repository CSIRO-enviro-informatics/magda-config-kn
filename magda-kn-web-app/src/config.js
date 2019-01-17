// const fallbackApiHost = "https://kn-v2-dev.oznome.csiro.au/";
// const fallbackApiHost = 'http://adb009eba34b.k8s-dev.oznome.csiro.au/'
// const fallbackApiHost = "http://kn-v2-staging.k8s-dev.oznome.csiro.au/"
// const fallbackApiHost = "http://staging.knowledgenet.co/"
const fallbackApiHost = "http://192.168.99.101:30100/";
const serverConfig = window.magda_server_config || {};
const baseUrl = serverConfig.baseUrl || fallbackApiHost;
const fallbackBaseExternalUrl =
    baseUrl === "/"
        ? window.location.protocol + "//" + window.location.host + "/"
        : baseUrl;
const baseExternalUrl = serverConfig.baseExternalUrl || fallbackBaseExternalUrl;
const registryApiUrl =
    serverConfig.registryApiBaseUrl || fallbackApiHost + "api/v0/registry/";
const previewMapUrl =
    serverConfig.previewMapBaseUrl || fallbackApiHost + "preview-map/";
const proxyUrl = previewMapUrl + "proxy/";
const API = {
    baseUrl,
    baseExternalUrl,
    authApiUrl: serverConfig.authApiBaseUrl || fallbackApiHost + "api/v0/auth/",
    datasetCount: registryApiUrl + "records/count?aspect=dcat-dataset-strings",
    organisationsCount:
        registryApiUrl + "records/count?aspect=organization-details",
    search: serverConfig.searchApiBaseUrl || fallbackApiHost + "api/v0/search/",
    dataSetDetail: registryApiUrl + "records/",
    dataSetDetail_allAspects:
        "?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status&optionalAspect=dataset-quality-rating&optionalAspect=dataset-linked-data-rating",
    dataSetOrg:
        registryApiUrl +
        "records?aspect=organization-details&optionalAspect=source&limit=20000",
    dataSetOrgInfo: registryApiUrl + "records/",
    dataSourceCount:
        registryApiUrl +
        "records?aspect=organization-details&optionalAspect=source&limit=20000",
    dataSource:
        registryApiUrl +
        "records?aspect=organization-details&optionalAspect=source&limit=20000",
    elasticSearch: `${baseUrl}api/v0/es-query/datasets`,
    previewMapUrl,
    proxyUrl,
    breakpoints: {
        small: 768,
        medium: 992,
        large: 1200
    }
};

export default API;

const API = {
    baseUrl: "http://kn-v2-dev.oznome.csiro.au",
    datasetCount: "/api/v0/registry/records/count?aspect=dcat-dataset-strings",
    organisationsCount:
        "/api/v0/registry/records/count?aspect=organization-details",
    search: "/api/v0/search/datasets?query=",
    dataSetDetail: "/api/v0/registry/records/",
    dataSetDetail_allAspects:
        "?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status&optionalAspect=dataset-quality-rating&optionalAspect=dataset-linked-data-rating",
    dataSetOrg:
        "/api/v0/registry/records?aspect=organization-details&optionalAspect=source&limit=20000",
    dataSetOrgInfo: "/api/v0/registry/records/",
    dataSourceCount:
        "/api/v0/registry/records/count?aspect=organization-details&optionalAspect=source",
    dataSource:
        "/api/v0/registry/records?aspect=organization-details&optionalAspect=source&limit=20000"
};
export default API;

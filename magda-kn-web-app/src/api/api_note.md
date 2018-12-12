
#Where data sources = data catalogues/harvest sources#
=== Ask ashley tomorrow.
- was written as static number 25
  ```html
    <li> 
        <strong><span>25</span></strong>
        harvested sources
    </li>
  ```

mab be use this http://kn-v2-dev.oznome.csiro.au/api/v0/registry/records?aspect=organization-details&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status 
to get source and anlyzing
- "name": "data.gov.au",
- "type": "ckan-organization"

# organisations = data providers (what you currently have)
## publishers / organisations / data provider detail
- http://kn-v2-dev.oznome.csiro.au/api/v0/registry/records?aspect=organization-details
## publisher count 
- http://kn-v2-dev.oznome.csiro.au/api/v0/registry/records?aspect=organization-details&limit=0
## paging 
- records?aspect=organization-details&limit=${config.resultsPerPage}&start=${(start-1)*config.resultsPerPage}


# get dataset number and dataset list for given publisher
http://kn-v2-dev.oznome.csiro.au/api/v0/search/datasets?query='*+by+publishername'&start=0&limit=0


# all dataset numer
    const url = http://kn-v2-dev.oznome.csiro.au/api/v0/registry/records?limit=0&aspect=dcat-dataset-strings


# Get one dataset from an identifier
http://kn-v2-dev.oznome.csiro.au/api/v0/registry/records/ds-vic-9af819cb-b6c3-42e2-bed6-cb5bba367776?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status
## Using an encodeURIComponent() function wrap identifier to transfer special chars to URL supported
http://kn-v2-dev.oznome.csiro.au/api/v0/registry/records/ds-act-https%3A%2F%2Fwww.data.act.gov.au%2Fapi%2Fviews%2Fd56a-2nhi?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status



# thematic areas = tags/keywords, etc - perhaps you could provide that bubble visualisastion for top 100 keywords or something. See how you go.
- the number of keyword or tag represents the number of documents addopted the keyword/tag
- all dataset should be loaded to calcualte top 100 keywords/tags using an Map datastructure. 
## ckan-dataset: has hag:
    ```json
    "tags": [
    {
      "name": "DTF",
      "state": "active",
      "vocabulary_id": null,
      "display_name": "DTF",
      "id": "8c50f7cd-be4a-4773-af39-beb60faadd32",
      "revision_timestamp": "2016-04-27T16:00:57.325852"
    },
    {
      "name": "Department of Treasury and Finance",
      "state": "active",
      "vocabulary_id": null,
      "display_name": "Department of Treasury and Finance",
      "id": "d026f859-2239-4f76-8cda-44d2bb7ca79b",
      "revision_timestamp": "2016-04-27T16:00:57.325852"
    },
    {
      "name": "Gambling Taxes",
      "state": "active",
      "vocabulary_id": null,
      "display_name": "Gambling Taxes",
      "id": "5e3f689b-36fc-4ae0-91a3-4d359d1b8851",
      "revision_timestamp": "2016-04-27T16:00:57.325852"
    },
    {
      "name": "State Budget 2016-17",
      "state": "active",
      "vocabulary_id": null,
      "display_name": "State Budget 2016-17",
      "id": "7f26f846-242b-419f-83ff-395b9594ca67",
      "revision_timestamp": "2016-04-27T16:00:57.325852"
    }
  ],
  ```

## dcat-dataset-strings has keywords:
  ```json
  "keywords": [
      "DTF",
      "Department of Treasury and Finance",
      "Gambling Taxes",
      "State Budget 2016-17"
    ],
  ```

# query by tag/keyword
http://kn-v2-dev.oznome.csiro.au/api/v0/search/datasets?query=data


# magda front search to backend transfer code
You can also use special filter keywords in the search box to do a more structured search. The keywords must be after the free text. The filter keywords are:

by: publisher, such as Geoscience Australia
as: format, such as CSV
from: datasets with any part of their timespan after this date/time, such as 2015-01-01
to: datasets with any part of their timespan before this date/time, such as 2017-06-01
  ```javascript
  export default function(query:Query){
    let keyword = defined(query.q) ? query.q : '';
    let dateFrom = defined(query.dateFrom) ? '+from+' + query.dateFrom : '';
    let dateTo=defined(query.dateTo) ? '+to+' + query.dateTo : '';
    let publisher = queryToString('+by', query.publisher);
    let format = queryToString('+as', query.format);
    let location = queryToLocation(query.regionId, query.regionType);
    let startIndex = defined(query.page) ? (query.page - 1)* config.resultsPerPage : 0;

    let apiQuery = `${encodeURIComponent(keyword)}${publisher}${format}${dateFrom}${dateTo}${location}&start=${startIndex}&limit=${config.resultsPerPage}`;
    return apiQuery;
  }

  function queryToString(preposition, query){
    if(!defined(query)) return '';
    if(Array.isArray(query)){
      return query.map(q=>
      `${preposition}+${encodeURIComponent(q)}`).join('+')
    } else {
      return `${preposition}+${encodeURIComponent(query)}`
    }
  }

  function queryToLocation(regionId, regiontype){
    // what if there are more than one regionId or regionType in the url?
    if(!defined(regionId) || !defined(regiontype)) return '';
    return `+in+${regiontype}:${regionId}`;
  }
  ```
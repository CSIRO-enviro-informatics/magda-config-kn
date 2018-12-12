import DataSetListForOrg from "../dataset/DataSetListForOrg";


export function fetchFeaturedDatasetsFromRegistry(ids: Array<string>):Object{
    return (dispatch: Function, getState: Function)=>{
      if(getState().featuredDatasets.isFetching){
        return false
      }
      dispatch(requestDatasets(ids))
      const fetches = ids.map(id=>fetch(config.registryApiUrl + `records/${encodeURIComponent(id)}?aspect=dcat-dataset-strings&optionalAspect=dataset-publisher&optionalAspect=source&dereference=true`).then(response=>response.json()));
      Promise.all(fetches).then(jsons=>dispatch(receiveDatasets(jsons))).catch(error=>dispatch(requestDatasetsError(error)))
    }
  }

  
  export function fetchFeaturedPublishersFromRegistry(ids: Array<string>):Object{
    return (dispatch: Function, getState: Function)=>{
      if(getState().featuredPublishers.isFetching){
        return false
      }
      dispatch(requestPublishers(ids))
      const fetches = ids.map(id=>fetch(config.registryApiUrl + `records/${id}?aspect=organization-details`).then(response=>response.json()));
      Promise.all(fetches).then(jsons=>dispatch(receivePublishers(jsons)))
    }
  }


  ## Get an DataSet
  ?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status
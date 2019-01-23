## KN web app with react

## How to install

-   install nodejs with npm
-   install yarn
-   git pull this repo
-   At project root, run `yarn install`
-   cd to `magda-kn-web-app`
-   run `yarn dev` to start a dev server
-   default browser will be launched with http://locahost:3000 address

By default, the web app will connect to the APIs @ https://staging-test.knowledgenet.co

You can change this by changing the value of the variable `fallbackApiHost` in `src/config.js`.

## js package used

-   react, react-dom and react-script
-   react-router-dom router for single page componets navigation
-   react-bootstrap for grid display.

## directory organiztion

-   index.js regists router and App.js
-   App.js regists navbar, main content display navigation, and footer
-   NavBar.js provides header navbar
-   NavMainContent.js is the place where switch all routes and call related compents for displaying.
-   Components for specific view was organized in a forder, such as home view, search result view.

## Problem & TODO

-   /registry/records route results organized by aspects, /search/dataset? query show json data different with /registry/records
-   Change page navigation buttongroup to Pagination component in bootstrap

-   New harvest data may cause resource page error: Cannot read property 'identifier' of undefined item.publisher.identifier
    This is because some data don't contain the key: publisher,
    such as http://kn-v2-dev.oznome.csiro.au/api/v0/search/datasets?query=discrimination+as+www:link-1.0-http--link
    The top 2 data don't have publisher and they have 15 keys, (others have 15 keys.)

## Test

-   facts which will not change (random choose 5 instances from following response instances )

*   search specific publisher
*   all searched dataset should have the same json structure
    -   /api/v0/search/datasets
    -   /api/v0/search/datasets?query=trees
    -   /api/v0/search/datasets?query=by+Aboriginal%20Affairs%20Victoria
*   all organization/publisher should have the same json structure
    -   /api/v0/registry/records?aspect=organization-details&optionalAspect=source
*   A publisher detail should have the same json structure

    -   /api/v0/registry/records/org-vic-ee15ed9f-c17e-443c-ad9e-6ff35dfd1e2d?aspect=organization-details&optionalAspect=source

*   all dataset should have the same json structure
    -   /api/v0/registry/records
    -   /api/v0/registry/records/ds-vic-9af819cb-b6c3-42e2-bed6-cb5bba367776?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status&optionalAspect=dataset-quality-rating&optionalAspect=dataset-linked-data-rating

-   asserts the server APIs are up

*   http://kn-v2-dev.oznome.csiro.au
*   /api/v0/search/datasets
*   /api/v0/search/datasets?query=trees
*   /api/v0/registry/records
*   /api/v0/registry/records?aspect=dcat-dataset-strings
*   /api/v0/registry/records?aspect=organization-details
*   /api/v0/registry/records?aspect=organization-details&optionalAspect=source&limit=200
*   /api/v0/registry/records/ds-vic-9af819cb-b6c3-42e2-bed6-cb5bba367776?aspect=dataset-publisher&dereference=true
*   /api/v0/registry/records/org-vic-ee15ed9f-c17e-443c-ad9e-6ff35dfd1e2d?aspect=dcat-dataset-strings&optionalAspect=dcat-distribution-strings&optionalAspect=dataset-distributions&optionalAspect=temporal-coverage&dereference=true&optionalAspect=dataset-publisher&optionalAspect=source&optionalAspect=link-status&optionalAspect=dataset-quality-rating&optionalAspect=dataset-linked-data-rating

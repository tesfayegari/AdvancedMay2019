(function () {
  'use strict';

  empApp.factory('svc', ['$http', '$q', function ($http, $q) {
    //Local Variables 
    var webUrl = _spPageContextInfo.webAbsoluteUrl;
    // SP REST API HEADERS
    var requestHeader = {
      getHeader: {
        'headers': {
          'accept': 'application/json;odata=verbose'
        }
      }
    }
    // END OF HEADERS
    // SP REST CRUD
    function _getListItems(urlValue) {
      return $http.get(urlValue, requestHeader.getHeader)
        .then(function (response) {
           //return response;
          return response.data.d.results;
        });
    };
    // END OF SP REST CRUD
    return {
      getView: function (viewName) {
        return webUrl + '/SiteAssets/AngularEmpSpotlight/view/' + viewName;
      },
      getItems: function(listName){
        var url = webUrl + "/_api/web/lists/getbytitle('"+ listName + "')/items";
        return _getListItems(url)
      }
    }; //End of Service Return

  }]); //ends svc function

})(); //main anonymous function
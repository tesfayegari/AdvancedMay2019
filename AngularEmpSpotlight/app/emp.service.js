(function () {
  'use strict';

  empApp.factory('svc', ['$http', '$q', function ($http, $q) {
      
      return {
         getView: function(viewName){
           return '/view/' + viewName;
         }
      }; //End of Service Return

  }]); //ends svc function

})(); //main anonymous function
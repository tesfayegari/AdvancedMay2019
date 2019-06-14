(function(){
  "use strict";

  empApp.component('employee',{
    controllerAs: 'vm',
    controller: function(svc){
      var vm = this;
      vm.tempUrl = "/view/employee.html";
      vm.$onInit = function (){
        console.log(vm.title + " " + vm.count);
      }

    },
    template: "<div ng-include='vm.tempUrl'></div>",
    bindings: {
      title: '@',
      count: '@'
    }

  });

  empApp.component('student',{
    controllerAs: 'vm',
    controller: function(svc){},
    template: '<h1>This is Student Spotlight</h1>',
    bindings: {}

  });
  
  
})();
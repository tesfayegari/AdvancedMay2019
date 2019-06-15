(function(){
  "use strict";

  empApp.component('employee',{
    controllerAs: 'vm',
    controller: function(svc){
      var vm = this;
      vm.tempUrl = svc.getView('employee.html');
      vm.$onInit = function (){
        svc.getItems('EmployeeSpotlight').then(function(response){
          vm.employees = response;
          console.log(response);
        });
        
        if(vm.count)
        vm.employees = vm.employees.slice(0,vm.count*1);
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
    controller: function(svc){


    },
    template: '<h1>This is Student Spotlight</h1>',
    bindings: {}

  });
  
  
})();
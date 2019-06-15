(function(){
  "use strict";

  empApp.component('employee',{
    controllerAs: 'vm',
    controller: function(svc){
      var vm = this;
      vm.tempUrl = svc.getView('employee.html');
      vm.$onInit = function (){
        console.log(vm.title + " " + vm.count);
        vm.employees = [{name:'Yetim',title:'SP Developer'},
                        {name:'Fasil',title:'SharePoint Admin'},
                        {name:'Araya',title:'SP Archictect'},
                        {name:'Mekdi',title:'Developer'}, 
                        {name:'Assefa', title: 'Nothing'},
                        {name:'Assefa 2', title: 'Database Developer'},
                      ];
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
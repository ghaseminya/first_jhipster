(function() {
    'use strict';

    angular
        .module('myappApp')
        .controller('DepartmentMySuffixDeleteController',DepartmentMySuffixDeleteController);

    DepartmentMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Department'];

    function DepartmentMySuffixDeleteController($uibModalInstance, entity, Department) {
        var vm = this;

        vm.department = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Department.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('myappApp')
        .controller('TaskMySuffixDeleteController',TaskMySuffixDeleteController);

    TaskMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Task'];

    function TaskMySuffixDeleteController($uibModalInstance, entity, Task) {
        var vm = this;

        vm.task = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Task.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

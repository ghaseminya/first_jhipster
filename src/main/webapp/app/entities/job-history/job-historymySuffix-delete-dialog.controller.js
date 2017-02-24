(function() {
    'use strict';

    angular
        .module('myappApp')
        .controller('JobHistoryMySuffixDeleteController',JobHistoryMySuffixDeleteController);

    JobHistoryMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'JobHistory'];

    function JobHistoryMySuffixDeleteController($uibModalInstance, entity, JobHistory) {
        var vm = this;

        vm.jobHistory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            JobHistory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('myappApp')
        .controller('JobMySuffixDeleteController',JobMySuffixDeleteController);

    JobMySuffixDeleteController.$inject = ['$uibModalInstance', 'entity', 'Job'];

    function JobMySuffixDeleteController($uibModalInstance, entity, Job) {
        var vm = this;

        vm.job = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Job.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

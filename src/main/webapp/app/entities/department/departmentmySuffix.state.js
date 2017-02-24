(function() {
    'use strict';

    angular
        .module('myappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('departmentmySuffix', {
            parent: 'entity',
            url: '/departmentmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'myappApp.department.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departmentsmySuffix.html',
                    controller: 'DepartmentMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('department');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('departmentmySuffix-detail', {
            parent: 'entity',
            url: '/departmentmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'myappApp.department.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/department/departmentmySuffix-detail.html',
                    controller: 'DepartmentMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('department');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Department', function($stateParams, Department) {
                    return Department.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'departmentmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('departmentmySuffix-detail.edit', {
            parent: 'departmentmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/departmentmySuffix-dialog.html',
                    controller: 'DepartmentMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('departmentmySuffix.new', {
            parent: 'departmentmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/departmentmySuffix-dialog.html',
                    controller: 'DepartmentMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                departmentName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('departmentmySuffix', null, { reload: 'departmentmySuffix' });
                }, function() {
                    $state.go('departmentmySuffix');
                });
            }]
        })
        .state('departmentmySuffix.edit', {
            parent: 'departmentmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/departmentmySuffix-dialog.html',
                    controller: 'DepartmentMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('departmentmySuffix', null, { reload: 'departmentmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('departmentmySuffix.delete', {
            parent: 'departmentmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/department/departmentmySuffix-delete-dialog.html',
                    controller: 'DepartmentMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Department', function(Department) {
                            return Department.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('departmentmySuffix', null, { reload: 'departmentmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

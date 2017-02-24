(function() {
    'use strict';

    angular
        .module('myappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('regionmySuffix', {
            parent: 'entity',
            url: '/regionmySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'myappApp.region.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/region/regionsmySuffix.html',
                    controller: 'RegionMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('region');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('regionmySuffix-detail', {
            parent: 'entity',
            url: '/regionmySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'myappApp.region.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/region/regionmySuffix-detail.html',
                    controller: 'RegionMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('region');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Region', function($stateParams, Region) {
                    return Region.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'regionmySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('regionmySuffix-detail.edit', {
            parent: 'regionmySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/regionmySuffix-dialog.html',
                    controller: 'RegionMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Region', function(Region) {
                            return Region.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('regionmySuffix.new', {
            parent: 'regionmySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/regionmySuffix-dialog.html',
                    controller: 'RegionMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                regionName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('regionmySuffix', null, { reload: 'regionmySuffix' });
                }, function() {
                    $state.go('regionmySuffix');
                });
            }]
        })
        .state('regionmySuffix.edit', {
            parent: 'regionmySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/regionmySuffix-dialog.html',
                    controller: 'RegionMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Region', function(Region) {
                            return Region.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('regionmySuffix', null, { reload: 'regionmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('regionmySuffix.delete', {
            parent: 'regionmySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/region/regionmySuffix-delete-dialog.html',
                    controller: 'RegionMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Region', function(Region) {
                            return Region.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('regionmySuffix', null, { reload: 'regionmySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

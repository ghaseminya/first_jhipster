(function() {
    'use strict';

    angular
        .module('myappApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('countrymySuffix', {
            parent: 'entity',
            url: '/countrymySuffix',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'myappApp.country.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/country/countriesmySuffix.html',
                    controller: 'CountryMySuffixController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('country');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('countrymySuffix-detail', {
            parent: 'entity',
            url: '/countrymySuffix/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'myappApp.country.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/country/countrymySuffix-detail.html',
                    controller: 'CountryMySuffixDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('country');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Country', function($stateParams, Country) {
                    return Country.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'countrymySuffix',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('countrymySuffix-detail.edit', {
            parent: 'countrymySuffix-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/countrymySuffix-dialog.html',
                    controller: 'CountryMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Country', function(Country) {
                            return Country.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('countrymySuffix.new', {
            parent: 'countrymySuffix',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/countrymySuffix-dialog.html',
                    controller: 'CountryMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                countryName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('countrymySuffix', null, { reload: 'countrymySuffix' });
                }, function() {
                    $state.go('countrymySuffix');
                });
            }]
        })
        .state('countrymySuffix.edit', {
            parent: 'countrymySuffix',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/countrymySuffix-dialog.html',
                    controller: 'CountryMySuffixDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Country', function(Country) {
                            return Country.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('countrymySuffix', null, { reload: 'countrymySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('countrymySuffix.delete', {
            parent: 'countrymySuffix',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/country/countrymySuffix-delete-dialog.html',
                    controller: 'CountryMySuffixDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Country', function(Country) {
                            return Country.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('countrymySuffix', null, { reload: 'countrymySuffix' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

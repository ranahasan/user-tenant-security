define(['user/user-module', 'tenantServices/tenant-service', 'userServices/user-service'], function (userModule) {
    'use strict';
    userModule.controller('UserCreateController', ['$scope', 'TenantService', 'UserService', function ($scope, TenantService, UserService) {
        console.log('User Create Controller running........');
        $scope.tenants = [];
        $scope.bCreateNewTenant = true;
        (function () {
            TenantService.query({}, function (data) {
                $scope.tenants = data.tenants;
                if (data.tenants)
                    $scope.selectedTenant = data.tenants[0];
            });
        })();

        $scope.createUser = function (data) {
            if (data) {
                var user = {};
                user.userId = data.userId;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.email = data.email;
                user.password = data.password;
                if (!$scope.bCreateNewTenant) {
                    user.tenantId = $scope.selectedTenant.tenantId;
                } else {
                    user.tenantId = data.tenantId;
                }
                UserService.save(user, function (data) {
                    $scope.alerts.push({type: 'success', msg: data.userId + ' is created successfully' });
                }, function (err) {
                    $scope.alerts.push({type: 'danger', msg: 'User creation is failed for ' + err.data.message});
                });
            }
        };
    }]);
});

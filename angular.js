var app = angular.module("myapp", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", { templateUrl: "trangchu.html", controller: "myCtrl" })
        .when("/gioithieu", { templateUrl: "gioithieu.html", controller: "myCtrl" })
        .when("/dulichtrongnuoc", { templateUrl: "dulichtrongnuoc.html", controller: "myCtrl" })
        .when("/lienhe", { templateUrl: "trogiup.html", controller: "myCtrl" })
        .when("/tintuc", { templateUrl: "tintuc.html", controller: "myCtrl" })
        .when("/lichkhoihanh", { templateUrl: "lichkhoihanh.html", controller: "myCtrl" })
        .when("/dangnhap", { templateUrl: "dangnhap.html", controller: "myCtrl" })
        .when("/dangky", { templateUrl: "dangky.html", controller: "myCtrl" })
        .when("/dulichngoainuoc", { templateUrl: "dulichnuocngoai.html", controller: "myCtrl" })
        .when("/duthuyen", { templateUrl: "duthuyen.html", controller: "myCtrl" })
        .when("/chuyendi", { templateUrl: "chuyendi.html", controller: "myCtrl" })
        .when("/detail/:id", { templateUrl: "chitiettourHanQuoc.html", controller: "myCtrl" },)

        .otherwise({ templateUrl: "trangchu.html", controller: "myCtrl" })
})
app.controller("myCtrl", function ($scope, $rootScope, $routeParams, $http) {
    $scope.products = [];
    $http.get("http://localhost:3000/products").then(function (reponse) {
        $scope.products = reponse.data;
        console.log($scope.products);
        $scope.detailPro = $scope.products.find(item => item.id == $routeParams.id);
    });
    $scope.sort = 'price';
    $scope.tang = function () {
        $scope.sort = 'price';
    }
    $scope.giam = function () {
        $scope.sort = '-price';
    }
    $scope.treem = '1';
    $scope.nguoilon = '1';

    // giỏ hàng
    $rootScope.cart = [];
    $rootScope.addCart = function (products) {
        if (typeof $rootScope.card == "undefined") {
            $rootScope.card = [];
        }
        console.log($rootScope.card);
        alert("Tour đã được thêm vào giỏ hàng !");
        let productCopy = angular.copy(products);
        productCopy.quantity = 1;
        $rootScope.card.push(productCopy);
        $rootScope.calculateTotal();
    };
    $rootScope.calculateTotal = function () {
        let total = 0;
        if ($rootScope.card && $rootScope.card.length > 0) {
            for (let i = 0; i < $rootScope.card.length; i++) {
                let price = parseFloat($rootScope.card[i].price);
                let quantity = parseFloat($rootScope.card[i].quantity);
                total += price * quantity;
            }
        }
        $rootScope.totalAmount = total;
        console.log("Tổng tiền: " + $rootScope.totalAmount);

    };
    $rootScope.removecart = function (item) {
        var index = $rootScope.card.indexOf(item);
        if (index !== -1) {
            $rootScope.card.splice(index, 1);
            $rootScope.calculateTotal();
        }
    }
    $scope.increaseQuantity = function (item) {
        item.quantity += 1;
        $rootScope.calculateTotal();
    };


    $scope.decreaseQuantity = function (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
            $rootScope.calculateTotal();
        }
    };
    $rootScope.updatequantity = function (item) {
        if (item.quantity < 1) {
            item.quantity = 1;
        }
        $rootScope.calculateTotal();
    }

    $scope.Users = [];
    $scope.Users = JSON.parse(localStorage.getItem('users'));
    if ($scope.Users == null)
        $http.get("http://localhost:3000/user").then(function (reponse) {
            $scope.Users = reponse.data;
            localStorage.setItem('users', JSON.stringify(reponse.data));

        },
            function (reponse) {
                var existingUser = $scope.Users.find(user => user.Email === $scope.User.Email);
                if (existingUser) {
                    alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
                    return;
                }
                alert("Không thể tạo tài khoán");
            }

        );
    console.log("Users= ", $scope.Users);
    $scope.dangky = function () {
        $scope.Users.push($scope.User);
        localStorage.setItem('users', JSON.stringify($scope.Users));
        alert(" Đăng ký thành công ! \n Họ Tên: " + $scope.User.fullname + "\nEmail: "+  $scope.User.Email + "\n " +  $scope.User.password);
        $location.path('/');
    }

    $rootScope.username = sessionStorage.getItem('username');
    $rootScope.dangnhap= function()
    {
        $rootScope.username = "" ;
        u = $scope.u ;
        p = $scope.p ;
        index = $scope.User
    }
});

app.directive('passwordMatch', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            scope.$watch(function () {
                var password = scope.$eval(attrs.passwordMatch);
                var password2 = ctrl.$viewValue;
                return password === password2;
            }, function (isMatching) {
                ctrl.$setValidity('passwordMatch', isMatching);
            });
        }
    };


});

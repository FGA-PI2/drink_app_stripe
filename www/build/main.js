webpackJsonp([6],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__domain_user_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_menu_menu__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_admin_admin__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(_http, navCtrl, _service, _loadingCtrl, _alertCtrl, splashScreen) {
        this._http = _http;
        this.navCtrl = navCtrl;
        this._service = _service;
        this._loadingCtrl = _loadingCtrl;
        this._alertCtrl = _alertCtrl;
        this.splashScreen = splashScreen;
        this.splash = true;
        this.splashScreen.show();
        this.splashScreen.hide();
        console.log(new Date().toISOString());
    }
    LoginPage.prototype.register = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.tryLogin = function () {
        var _this = this;
        this.loader = this._loadingCtrl.create({
            content: 'Logando...'
        });
        this.loader.present();
        console.log('tentano buscar token de:', this.email, this.password);
        var newUser = {
            password: this.password,
            username: this.email,
        };
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this._http.post('http://dev-pi2-api.herokuapp.com/api-token-auth/', (newUser), options).subscribe(function (data) {
            _this._token = (JSON.parse(data['_body'])['token']);
            console.log('token gerada:', _this._token);
            _this._service.saveToken(_this._token);
            _this.requestUserWithToken(_this.email);
        }, function (err) {
            _this.loader.dismiss();
            _this._alertCtrl.create({
                title: 'OPS!',
                buttons: [{ text: 'OK' }],
                subTitle: 'Não foi possível conectar ao servidor!'
            }).present();
        });
    };
    LoginPage.prototype.requestUserWithToken = function (emailRequest) {
        var _this = this;
        console.log('buscando dados do usuario:', emailRequest);
        var userResponsed;
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': this._token
        });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this._http.get("http://dev-pi2-api.herokuapp.com/users/?email=" + emailRequest, options).subscribe(function (data) {
            userResponsed = JSON.parse((data['_body']));
            console.log('Usuario retornado:', userResponsed[0]);
            if (userResponsed[0].email != emailRequest) {
                _this.loader.dismiss();
                _this._alertCtrl.create({
                    title: 'OPS!',
                    buttons: [{ text: 'OK' }],
                    subTitle: 'Email ou senha incorretos!'
                }).present();
            }
            else {
                console.log('sucesso!', userResponsed[0].email);
                _this._service.saveLoggedUser(userResponsed[0]);
                if (userResponsed[0].is_superuser == true) {
                    _this.loader.dismiss();
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_admin_admin__["a" /* AdminPage */]);
                    console.log('É ADM');
                }
                else {
                    _this.loader.dismiss();
                    console.log('NAO É ADM');
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__pages_menu_menu__["a" /* MenuPage */]);
                }
            }
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setTimeout(function () { return _this.splash = false; }, 4000);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/login/login.html"*/'<div id="custom-overlay" [style.display]="splash ? \'flex\': \'none\'">\n  <div class="flb">\n    <div class="Aligner-item Aligner-item--top"></div>\n    <img src="assets/drink-sun-2.png" style="width: 35%;">\n    <div class="Aligner-item Aligner-item--bottom"></div>\n    <div class="Aligner-item Aligner-item--bottom"></div>\n  </div>\n</div>\n\n<ion-content padding="true" style="background: url(https://i.pinimg.com/originals/73/9e/96/739e96f0224947668029d10ee4fa07ae.jpg) no-repeat center;background-size:cover;" class="has-header">\n  <div>\n    <img class="animated infinite pulse " src="https://image.ibb.co/fipkMk/drink_sun.png" style="display: block; width: 40%; height: auto; margin-left: auto; margin-right: auto;">\n  </div>\n  <h2 id="page1-heading1" class="login">SunBar!</h2>\n  <form (ngSubmit)="tryLogin()">\n    <ion-list>\n      <ion-item class="animated fadeIn" style="margin-top: 40px">\n        <ion-input [(ngModel)]="email" name="email" type="text" placeholder="E-mail:"></ion-input>\n      </ion-item>\n      <div class="spacer" style="height: 20px;"></div>\n      <ion-item class="animated fadeIn">\n        <ion-input class="input" [(ngModel)]="password" name="password" type="password" placeholder="Senha:"></ion-input>\n      </ion-item>\n      <div class="spacer" style="height: 65px;"></div>\n      <div class="spacer" style="height: 10px;"></div>\n    </ion-list>\n    <button class="animated fadeIn" ion-button round block color="sunbar2" type="submit">Entrar</button>\n  </form>\n  <button class="animated fadeIn" ion-button round block color="sunbar2" (click)="register()">Registrar</button>\n</ion-content>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/login/login.html"*/
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__domain_user_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* unused harmony export logout */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cardapio_cardapio__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__historico_historico__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__creditos_creditos__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__paypal_paypal__ = __webpack_require__(211);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var MenuPage = (function () {
    function MenuPage(navCtrl, _service) {
        this.navCtrl = navCtrl;
        this._service = _service;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__cardapio_cardapio__["a" /* CardapioPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_7__creditos_creditos__["a" /* CreditosPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__historico_historico__["a" /* HistoricoPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_8__paypal_paypal__["a" /* PayPalPage */];
        this.tab6Root = logout;
    }
    Object.defineProperty(MenuPage.prototype, "loggedUser", {
        get: function () {
            return this._service.getLoggedUser();
        },
        enumerable: true,
        configurable: true
    });
    MenuPage.prototype.logout = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    return MenuPage;
}());
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/menu/menu.html"*/'<ion-content>\n  <h2>Olá {{ loggedUser.email }}!</h2>\n  <h2>Créditos: R{{ loggedUser.creditos | currency : \'USD\' : true}}!</h2>\n  <ion-tabs color="dark">\n  <ion-tab [root]="tab1Root" tabTitle="Início" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Drinks" tabIcon="wine"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Créditos" tabIcon="card"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Histórico" tabIcon="contacts"></ion-tab>\n  <ion-tab [root]="tab5Root" tabTitle="PayPal" tabIcon="cash"></ion-tab>\n  <ion-tab [root]="tab6Root" (ionSelect)="logout()" tabTitle="Sair" tabIcon="log-out"></ion-tab>\n</ion-tabs>\n</ion-content>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/menu/menu.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__["a" /* UserService */]])
], MenuPage);

var logout = (function () {
    function logout(navCtrl) {
        this.navCtrl = navCtrl;
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
        this.navCtrl.popToRoot();
    }
    return logout;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DrinkDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_querycode_querycode__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var DrinkDetailPage = (function () {
    function DrinkDetailPage(navCtrl, navParams, viewCtrl, _userService, _alertCtrl, _loadingCtrl, _http, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this._userService = _userService;
        this._alertCtrl = _alertCtrl;
        this._loadingCtrl = _loadingCtrl;
        this._http = _http;
        this.modalCtrl = modalCtrl;
        this.size = null;
        this.ice = false;
        this.headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': this._userService.getToken()
        });
        this.options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.drink = this.navParams.get('drink').drink;
        this.image = this.navParams.get('drink').image;
    }
    DrinkDetailPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    DrinkDetailPage.prototype.buyDrink = function (item) {
        var _this = this;
        this.loader = this._loadingCtrl.create({
            content: 'Processando pagamento...'
        });
        this._alertCtrl.create({
            title: 'ATENÇÃO!',
            subTitle: "Deseja comprar " + item.nome + " por R$" + item.preco + ",00?",
            buttons: [{ text: 'Cancelar' }, {
                    text: 'Comprar', handler: function () {
                        _this.loader.present();
                        setTimeout(function () {
                            _this.loader.dismiss();
                            _this.processDrink(item);
                        }, 1000);
                    }
                }]
        }).present();
        console.log(item);
    };
    DrinkDetailPage.prototype.processDrink = function (item) {
        var _this = this;
        this.loader.dismiss();
        if (this._user[0].creditos < item.preco) {
            var alert_1 = this._alertCtrl.create({
                title: 'OPS!',
                subTitle: 'Você não possui créditos suficiente!',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this._userService.updateCreditos(item.preco, false);
            var alert_2 = this._alertCtrl.create({
                title: 'Sucesso!',
                subTitle: 'Sua Bebida foi comprada!',
                buttons: [{
                        text: 'OK', handler: function () {
                            _this.callQueryCode(item);
                        }
                    }]
            });
            alert_2.present(item);
        }
    };
    DrinkDetailPage.prototype.callQueryCode = function (item) {
        var _this = this;
        var json = "{\"usuario\":\"" + this._user[0].id + "\",\"data_compra\":\"" + item.data_compra + "\"}";
        this.data = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=' + json;
        item.usuario = this._user[0].id,
            item.qr_code = {
                is_valid: true,
                qr_code: this.data
            };
        var myOrder = {
            pedido: item.pedido,
            qr_code: {
                is_valid: true,
                qr_code: this.data,
                usuario: this._user[0].id
            },
            nome: item.nome,
            gelo: this.ice,
            data_compra: item.data_compra,
            usuario: this._user[0].id
        };
        console.log('AQUIIIII ', myOrder);
        this._http
            .post("http://dev-pi2-api.herokuapp.com/compra/", myOrder, this.options).subscribe(function (data) {
            console.log(data);
            var modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_querycode_querycode__["a" /* QuerycodePage */], { 'string': _this.data });
            modal.present();
        });
    };
    DrinkDetailPage.prototype.checkoutCustomDrink = function (drink) {
        var _this = this;
        console.log('ESSE É O DRINK:', drink);
        this.loader = this._loadingCtrl.create({
            content: 'Processando pagamento...'
        });
        this.loader.present();
        var proporcaoDrink = [];
        for (var i = 0; i < drink.proporcao.length; i++) {
            var x = { bebida_name: drink.proporcao[i].bebida, volume: drink.proporcao[i].volume };
            proporcaoDrink.push(x);
        }
        this._http
            .get("http://dev-pi2-api.herokuapp.com/users/?email=" + this._userService.getEmailLoggedUser(), this.options)
            .map(function (res) { return res.json(); })
            .toPromise()
            .then(function (_user) {
            _this._user = _user;
            console.log('RETORNEI ISSO: ', _this._user);
            var myDate = new Date().toISOString();
            var drinkJson = {
                pedido: proporcaoDrink,
                gelo: _this.ice,
                tamanho: drink.size,
                data_compra: myDate,
                preco: drink.preco,
                nome: drink.nome,
            };
            _this.processDrink(drinkJson);
        });
    };
    return DrinkDetailPage;
}());
DrinkDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-drink-detail',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/drink-detail/drink-detail.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Description\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Fechar</span>\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="cards-bg">\n\n  <ion-card>\n\n    <img src="{{ image }}"/>\n\n    <ion-card-content>\n      <ion-card-title style="text-align: center;">\n        {{ drink.nome }}\n      </ion-card-title>\n      <p style="text-align: center;">{{ drink.volume }}ml de {{ drink.descricao }}</p>      \n    </ion-card-content>\n  </ion-card>\n  <ion-list>\n    <ion-list-header style="text-align: center;">\n      R{{ drink.preco | currency : \'usd\' : true }}\n    </ion-list-header>\n    <ion-item >\n      <ion-label>Gelo?</ion-label>\n      <ion-toggle checked="false" [(ngModel)]="ice"></ion-toggle>\n    </ion-item>\n  </ion-list>\n  <button ion-button block color="dark" (click)="checkoutCustomDrink(drink)">Finalizar Compra</button>\n</ion-content>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/drink-detail/drink-detail.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
], DrinkDetailPage);

//# sourceMappingURL=drink-detail.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistoricoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__domain_user_user_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HistoricoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HistoricoPage = (function () {
    function HistoricoPage(navCtrl, navParams, _http, _userService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._http = _http;
        this._userService = _userService;
        this._noOrders = true;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': this._userService.getToken()
        });
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
    }
    HistoricoPage.prototype.ionViewWillEnter = function () {
        this.loadOrders();
    };
    HistoricoPage.prototype.loadOrders = function () {
        var _this = this;
        this._total = 0;
        this._http
            .get("http://dev-pi2-api.herokuapp.com/compra/?usuario=" + this._userService.getIDLoggedUser(), this.options)
            .map(function (res) { return res.json(); })
            .toPromise()
            .then(function (_myOrders) {
            _this._noOrders = false;
            _this._myOrders = _myOrders.reverse();
            for (var i = 0; i < _this._myOrders.length; i++) {
                _this._total += _this._myOrders[i].preco;
            }
            if (_this._total > 0) {
            }
        });
    };
    return HistoricoPage;
}());
HistoricoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-historico',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/historico/historico.html"*/'<!--\n  Generated template for the HistoricoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Histórico de Compras</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list >\n    <h2 *ngIf="_noOrders" style="text-align: center;">Você não possui histórico de compras!</h2>\n    <ion-item class="animated bounceInUp" *ngFor="let order of _myOrders">\n      <h2>{{ order.nome }}</h2>\n      <p *ngFor="let qri of order.pedido">{{ qri.volume }}% {{ qri.bebida_name }}</p>\n      <p style="color:red" ion-button clear item-end>-R{{ order.preco | currency : \'USD\' : true}}</p>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title *ngIf="!_noOrders" >Total: -R{{ _total | currency : \'USD\' : true}}</ion-title>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/historico/historico.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_3__domain_user_user_service__["a" /* UserService */]])
], HistoricoPage);

//# sourceMappingURL=historico.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreditosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreditosPage = (function () {
    function CreditosPage(navCtrl, navParams, _userService, _alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._userService = _userService;
        this._alertCtrl = _alertCtrl;
    }
    CreditosPage.prototype.buyCredits = function () {
        var _this = this;
        this._alertCtrl.create({
            title: 'Atenção!',
            buttons: [{ text: 'Cancelar' }, { text: 'OK', handler: function () {
                        _this._userService.updateCreditos(_this._credits, true);
                    } }],
            subTitle: "Deseja comprar R$" + this._credits + ",00 de cr\u00E9ditos?"
        }).present();
    };
    return CreditosPage;
}());
CreditosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-creditos',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/creditos/creditos.html"*/'<!--\n  Generated template for the CreditosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Comprar Créditos</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list class="animated bounceInDown">\n    <ion-item-divider style="text-align: center;" color="light">\n      Digite o Valor\n    </ion-item-divider>\n    <div class="spacer" style="height:50px;" id="page-spacer1"></div>\n    <ion-item>\n      <ion-input [(ngModel)]="_credits" type="number" placeholder="R$ 15,00"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button class="animated bounceInUp" ion-button block color="dark" (click)="buyCredits()">Comprar</button>\n</ion-content>'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/creditos/creditos.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], CreditosPage);

//# sourceMappingURL=creditos.js.map

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 121;

/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cardapio/cardapio.module": [
		289,
		5
	],
	"../pages/creditos/creditos.module": [
		291,
		4
	],
	"../pages/drink-detail/drink-detail.module": [
		288,
		3
	],
	"../pages/historico/historico.module": [
		290,
		2
	],
	"../pages/menu-admin/menu-admin.module": [
		292,
		0
	],
	"../pages/querycode/querycode.module": [
		287,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 163;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(first_name, email, creditos, data_nascimento, password, is_superuser) {
        if (first_name === void 0) { first_name = ''; }
        if (email === void 0) { email = ''; }
        if (creditos === void 0) { creditos = 25; }
        if (data_nascimento === void 0) { data_nascimento = ''; }
        if (password === void 0) { password = ''; }
        if (is_superuser === void 0) { is_superuser = true; }
        this.first_name = first_name;
        this.email = email;
        this.creditos = creditos;
        this.data_nascimento = data_nascimento;
        this.password = password;
        this.is_superuser = is_superuser;
    }
    return User;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cardapio; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Cardapio = (function () {
    function Cardapio() {
        this.images = [
            'https://coisasdediva.files.wordpress.com/2016/02/drinks-com-vodka-5.jpg',
            'http://static.vix.com/pt/sites/default/files/styles/large/public/bdm/medicina-alternativa/drinks-afrodisiacos.jpg?itok=Wh48FOQj',
            'http://osboemios.com.br/wp-content/uploads/2016/01/Os-Boemios-Drinks-01-1160x480.jpg',
            'https://simplifica.efacil.com.br/wp-content/uploads/2015/12/drinks-faceis-para-festas-de-fim-de-ano.jpg',
            'http://www.elhombre.com.br/wp-content/uploads/2014/08/drinks-drinks-manjeticao-el-hombre.jpg',
            'http://osboemios.com.br/wp-content/uploads/2014/09/drinks-para-churrasco.jpg',
            'http://loucosporpraia.com.br/wp-content/uploads/2015/03/drinks-faceis.jpg',
            'https://coisasdediva.files.wordpress.com/2016/02/drinks-com-vodka-5.jpg',
            'http://static.vix.com/pt/sites/default/files/styles/large/public/bdm/medicina-alternativa/drinks-afrodisiacos.jpg?itok=Wh48FOQj',
            'http://osboemios.com.br/wp-content/uploads/2016/01/Os-Boemios-Drinks-01-1160x480.jpg',
            'https://simplifica.efacil.com.br/wp-content/uploads/2015/12/drinks-faceis-para-festas-de-fim-de-ano.jpg',
            'http://www.elhombre.com.br/wp-content/uploads/2014/08/drinks-drinks-manjeticao-el-hombre.jpg',
            'http://osboemios.com.br/wp-content/uploads/2014/09/drinks-para-churrasco.jpg',
            'http://loucosporpraia.com.br/wp-content/uploads/2015/03/drinks-faceis.jpg'
        ];
    }
    Cardapio.prototype.getImages = function () {
        return this.images;
    };
    return Cardapio;
}());
Cardapio = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], Cardapio);

//# sourceMappingURL=cardapio.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_throw__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var UserService = (function () {
    function UserService(_http, _alertCtrl, _loadingCtrl) {
        this._http = _http;
        this._alertCtrl = _alertCtrl;
        this._loadingCtrl = _loadingCtrl;
        this.headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'authorization': this._token
        });
        this.options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this._user = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
        this._userLogado = new __WEBPACK_IMPORTED_MODULE_1__user__["a" /* User */]();
    }
    UserService.prototype.getLoggedUser = function () {
        return this._userLogado;
    };
    UserService.prototype.getEmailLoggedUser = function () {
        return this._userLogado.email;
    };
    UserService.prototype.getIDLoggedUser = function () {
        return this._userLogado.id;
    };
    UserService.prototype.getToken = function () {
        console.log('buscando token:', this._token);
        return this._token;
    };
    UserService.prototype.saveToken = function (token) {
        console.log('buscando token:', this._token);
        this._token = token;
    };
    UserService.prototype.saveLoggedUser = function (user) {
        this._userLogado = user;
    };
    UserService.prototype.updateCreditos = function (creditos, plus) {
        var _this = this;
        console.log('novo: ', Number(creditos), 'antigo: ', typeof (this._userLogado.creditos));
        var url = "http://dev-pi2-api.herokuapp.com/users/" + this._userLogado.id + "/";
        if (plus == true) {
            this.loader = this._loadingCtrl.create({
                content: 'Processando...'
            });
            this.loader.present();
            var newCredits = this._userLogado.creditos + Number(creditos);
            console.log('newCredits: ', newCredits);
            var cred_1 = {
                creditos: newCredits
            };
            console.log('OIE', JSON.stringify(cred_1));
            console.log('A URL É: ', url);
            this._http.patch(url, cred_1, this.options).subscribe(function (data) {
                console.log(data);
                _this.loader.dismiss();
                _this._alertCtrl.create({
                    title: 'Sucesso!',
                    buttons: [{ text: 'OK' }],
                    subTitle: 'Sua compra foi aprovada!'
                }).present();
                _this._userLogado.creditos = cred_1.creditos;
            });
        }
        else {
            var cred_2 = {
                creditos: this._userLogado.creditos - creditos
            };
            console.log(JSON.stringify(cred_2));
            console.log('A URL É: ', url);
            this._http.patch(url, cred_2, this.options).subscribe(function (data) {
                console.log(data);
                _this._userLogado.creditos = cred_2.creditos;
            });
        }
    };
    return UserService;
}());
UserService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */]])
], UserService);

//# sourceMappingURL=user-service.js.map

/***/ }),

/***/ 210:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domain_user_user__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__domain_user_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_throw__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_toPromise__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var RegisterPage = (function () {
    function RegisterPage(navCtrl, _http, _service, _loadingCtrl, _alertCtrl) {
        this.navCtrl = navCtrl;
        this._http = _http;
        this._service = _service;
        this._loadingCtrl = _loadingCtrl;
        this._alertCtrl = _alertCtrl;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__domain_user_user__["a" /* User */]();
    }
    RegisterPage.prototype.registerAccount = function () {
        var _this = this;
        this.loader = this._loadingCtrl.create({
            content: 'Criando sua conta, por favor aguarde...'
        });
        this.loader.present();
        var newUser = {
            first_name: this.user.first_name,
            password: this.user.password,
            is_superuser: false,
            data_nascimento: this.user.data_nascimento,
            email: this.user.email,
            creditos: 0
        };
        console.log(newUser);
        var headers = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
        });
        var options = new __WEBPACK_IMPORTED_MODULE_4__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this._http.post('http://dev-pi2-api.herokuapp.com/users/', (newUser), options).subscribe(function (data) {
            _this.loader.dismiss();
            _this._alertCtrl.create({
                title: 'Uhuu!',
                buttons: [{ text: 'OK', handler: function () {
                            _this._service.saveLoggedUser(newUser);
                            _this.user.first_name = '';
                            _this.user.data_nascimento = '';
                            _this.user.email = '';
                            _this.user.password = '';
                            _this.password2 = '';
                        } }],
                subTitle: 'Sua conta foi criada com sucesso!'
            }).present();
            console.log(data);
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/register/register.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form (ngSubmit)="registerAccount()">\n\n    <ion-item>\n      <ion-label floating>Apelido</ion-label>\n      <ion-input [(ngModel)]="user.first_name" name="first_name" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input [(ngModel)]="user.email" name="email" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Data de Nascimemto</ion-label>\n      <ion-datetime [(ngModel)]="user.data_nascimento" name="data_nascimento" displayFormat="DD/MM/YY"></ion-datetime>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Senha</ion-label>\n      <ion-input [(ngModel)]="user.password" name="password" type="password"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Repetir Senha</ion-label>\n      <ion-input [(ngModel)]="password2" name="password2" type="password"></ion-input>\n    </ion-item>\n    <button ion-button block type="submit">Criar conta</button>\n  </form>\n\n\n</ion-content>'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/register/register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_3__domain_user_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PayPalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_paypal__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PayPalPage = (function () {
    function PayPalPage(payPal) {
        this.payPal = payPal;
        this.payment = new __WEBPACK_IMPORTED_MODULE_1__ionic_native_paypal__["c" /* PayPalPayment */]('10.10', 'BRL', 'TV', 'sale');
        this.currencies = ['BRL'];
        this.payPalEnvironment = 'payPalEnvironmentSandbox';
    }
    PayPalPage.prototype.makePayment = function () {
        var _this = this;
        this.payPal.init({
            PayPalEnvironmentProduction: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].payPalEnvironmentProduction,
            PayPalEnvironmentSandbox: __WEBPACK_IMPORTED_MODULE_2__config__["a" /* Config */].payPalEnvironmentSandbox
        }).then(function () {
            _this.payPal.prepareToRender(_this.payPalEnvironment, new __WEBPACK_IMPORTED_MODULE_1__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                _this.payPal.renderSinglePaymentUI(_this.payment).then(function (response) {
                    alert("Successfully paid. Status = " + response.response.state);
                    console.log(response);
                }, function () {
                    console.error('Error or render dialog closed without being successful');
                });
            }, function () {
                console.error('Error in configuration');
            });
        }, function () {
            console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
        });
    };
    return PayPalPage;
}());
PayPalPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-paypal',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/paypal/paypal.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>PayPal</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <form name="paymentForm">\n      <ion-item>\n        <ion-label floating>Amount</ion-label>\n        <ion-input type="text" name="amount" [(ngModel)]="payment.amount"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Currency</ion-label>\n        <ion-select [(ngModel)]="payment.currency" name="currency">\n          <ion-option value="{{currency}}" *ngFor="let currency of currencies">{{currency}}</ion-option>\n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Description</ion-label>\n        <ion-input type="text" name="description" [(ngModel)]="payment.shortDescription"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Intent</ion-label>\n        <ion-input type="text" name="intent" [(ngModel)]="payment.intent"></ion-input>\n      </ion-item>\n      <p>\n        <button ion-button block color="secondary" (click)="makePayment()">MAKE PAYMENT</button>\n      </p>\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/paypal/paypal.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_paypal__["a" /* PayPal */]])
], PayPalPage);

//# sourceMappingURL=paypal.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__menu_menu__ = __webpack_require__(109);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminPage = (function () {
    function AdminPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__menu_menu__["a" /* MenuPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__menu_menu__["a" /* MenuPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_1__menu_menu__["a" /* MenuPage */];
    }
    return AdminPage;
}());
AdminPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/admin/admin.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/admin/admin.html"*/
    }),
    __metadata("design:paramtypes", [])
], AdminPage);

//# sourceMappingURL=admin.js.map

/***/ }),

/***/ 214:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(233);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 233:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_drink_detail_drink_detail__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_menu_menu__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_cardapio_cardapio__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__domain_user_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__domain_bebida_bebida_service__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__domain_cardapio_cardapio__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_querycode_querycode__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_admin_admin__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_creditos_creditos__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_historico_historico__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_stripe__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_paypal_paypal__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_paypal__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_cardapio_cardapio__["a" /* CardapioPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_drink_detail_drink_detail__["a" /* DrinkDetailPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_querycode_querycode__["a" /* QuerycodePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_admin_admin__["a" /* AdminPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_creditos_creditos__["a" /* CreditosPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_historico_historico__["a" /* HistoricoPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_paypal_paypal__["a" /* PayPalPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/querycode/querycode.module#QuerycodePageModule', name: 'QuerycodePage', segment: 'querycode', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/drink-detail/drink-detail.module#DrinkDetailPageModule', name: 'DrinkDetailPage', segment: 'drink-detail', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/cardapio/cardapio.module#CardapioPageModule', name: 'CardapioPage', segment: 'cardapio', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/historico/historico.module#HistoricoPageModule', name: 'HistoricoPage', segment: 'historico', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/creditos/creditos.module#CreditosPageModule', name: 'CreditosPage', segment: 'creditos', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/menu-admin/menu-admin.module#MenuAdminPageModule', name: 'MenuAdminPage', segment: 'menu-admin', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_cardapio_cardapio__["a" /* CardapioPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_drink_detail_drink_detail__["a" /* DrinkDetailPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_querycode_querycode__["a" /* QuerycodePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_admin_admin__["a" /* AdminPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_creditos_creditos__["a" /* CreditosPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_historico_historico__["a" /* HistoricoPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_paypal_paypal__["a" /* PayPalPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_12__domain_user_user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_14__domain_cardapio_cardapio__["a" /* Cardapio */],
            __WEBPACK_IMPORTED_MODULE_13__domain_bebida_bebida_service__["a" /* BebidaService */],
            __WEBPACK_IMPORTED_MODULE_20__ionic_native_stripe__["a" /* Stripe */],
            __WEBPACK_IMPORTED_MODULE_22__ionic_native_paypal__["a" /* PayPal */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_cardapio_cardapio__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.paginas = [
            { titulo: "Cardápio", componente: __WEBPACK_IMPORTED_MODULE_5__pages_cardapio_cardapio__["a" /* CardapioPage */] },
            { titulo: "Comprar Créditos", componente: __WEBPACK_IMPORTED_MODULE_5__pages_cardapio_cardapio__["a" /* CardapioPage */] },
            { titulo: "Histórico", componente: __WEBPACK_IMPORTED_MODULE_5__pages_cardapio_cardapio__["a" /* CardapioPage */] },
            { titulo: "Sair", componente: __WEBPACK_IMPORTED_MODULE_5__pages_cardapio_cardapio__["a" /* CardapioPage */] },
            { titulo: "PayPal", componente: __WEBPACK_IMPORTED_MODULE_5__pages_cardapio_cardapio__["a" /* CardapioPage */] }
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        this.nav.push(page.componente);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content padding>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let pagina of paginas" (click)="openPage(pagina)">{{ pagina.titulo }}</button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" swipeBackEnabled="false" #content></ion-nav>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Config; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Config = (function () {
    function Config() {
    }
    return Config;
}());
Config.payPalEnvironmentSandbox = 'AU8r9_cHKXSn5HJcbd-oLLlCiDoHuWO6aZY4GoE3EYX0qlBFecu7ynaK3HGBz9XEjL_v84Sx6KwPMTUo';
Config.payPalEnvironmentProduction = 'ASFxnBeOTcTnutL14DyYF_3o-pTi-FAoArH6rN6fVW21HaiEAspnqRSZon6Thl_ddCFknqFPligCdOjP';
Config = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])()
], Config);

//# sourceMappingURL=config.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BebidaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BebidaService = (function () {
    function BebidaService(_http, _userService) {
        var _this = this;
        this._http = _http;
        this._userService = _userService;
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': this._userService.getToken()
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this._http.get("https://pi2-api.herokuapp.com/drink/", options).subscribe(function (data) {
            _this._bebidas = JSON.parse((data['_body']));
            console.log('Drinks:', _this._bebidas);
        });
    }
    // SUBSTITUIR PELA API DEPOIS
    BebidaService.prototype.bebidas = function () {
        return this._bebidas;
    };
    return BebidaService;
}());
BebidaService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */]])
], BebidaService);

//# sourceMappingURL=bebida-service.js.map

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuerycodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var QuerycodePage = (function () {
    function QuerycodePage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.querycodeString = this.navParams.get('string');
    }
    QuerycodePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
        // this.navCtrl.popToRoot();
        // this.navCtrl.setRoot(MenuPage);
    };
    return QuerycodePage;
}());
QuerycodePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-querycode',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/querycode/querycode.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Compra Finalizada\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="cards-bg">\n  <h1 style="text-align: center;">Resgate sua bebida em um SunBar!</h1>\n<img src="{{ querycodeString }}">\n</ion-content>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/querycode/querycode.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
], QuerycodePage);

//# sourceMappingURL=querycode.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardapioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domain_cardapio_cardapio__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__domain_user_user_service__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_drink_detail_drink_detail__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_querycode_querycode__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(84);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CardapioPage = (function () {
    function CardapioPage(navCtrl, navParams, _cardapio, _alertCtrl, _loadingCtrl, _userService, modalCtrl, _http, platform, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._cardapio = _cardapio;
        this._alertCtrl = _alertCtrl;
        this._loadingCtrl = _loadingCtrl;
        this._userService = _userService;
        this.modalCtrl = modalCtrl;
        this._http = _http;
        this.toastCtrl = toastCtrl;
        this.total = 0;
        this.pet = "puppies";
        this.isAndroid = false;
        this.bebidasCustom = [];
        this.levelvalue = [];
        this.totalCustomDrink = 0;
        this.bebidasCustomSize = 400;
        this.totalPrice = 0;
        this.drinks = [];
        this.headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            'Authorization': this._userService.getToken()
        });
        this.options = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({ headers: this.headers });
        this.images = this._cardapio.getImages();
        this.loader = this._loadingCtrl.create({
            content: 'Carregando...'
        });
        this.loader.present();
        this.loadQRCode();
        this._http.get("http://dev-pi2-api.herokuapp.com/drink/", this.options).subscribe(function (data) {
            _this.cardapio = JSON.parse((data['_body']));
            console.log('Drinks:', _this.cardapio);
            _this._http.get("http://dev-pi2-api.herokuapp.com/bebida/", _this.options).subscribe(function (data) {
                _this.bebidas = JSON.parse((data['_body']));
                _this.levelvalue = [];
                console.log('BEBIDAS MAN:', _this.bebidas);
                _this.loader.dismiss();
            });
        });
    }
    CardapioPage.prototype.detailDrink = function (drink, image) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_drink_detail_drink_detail__["a" /* DrinkDetailPage */], { 'drink': drink, 'image': image });
        modal.present();
    };
    CardapioPage.prototype.buyDrink = function (item) {
        var _this = this;
        this.loader = this._loadingCtrl.create({
            content: 'Processando pagamento...'
        });
        this._alertCtrl.create({
            title: 'ATENÇÃO!',
            subTitle: "Deseja comprar " + item.nome + " por " + item.preco + "?",
            buttons: [{ text: 'Cancelar' }, {
                    text: 'Comprar', handler: function () {
                        _this.loader.present();
                        setTimeout(function () {
                            _this.loader.dismiss();
                            _this.processDrink(item);
                        }, 1000);
                    }
                }]
        }).present();
        console.log(item);
    };
    CardapioPage.prototype.processDrink = function (item) {
        var _this = this;
        if (this._user[0].creditos < item.preco) {
            this.loader.dismiss();
            var alert_1 = this._alertCtrl.create({
                title: 'OPS!',
                subTitle: 'Você não possui créditos suficiente!',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            this.loader.dismiss();
            this._userService.updateCreditos(item.preco, false);
            var alert_2 = this._alertCtrl.create({
                title: 'Sucesso!',
                subTitle: 'Sua Bebida foi comprada!',
                buttons: [{
                        text: 'OK', handler: function () {
                            _this.callQueryCode(item);
                        }
                    }]
            });
            alert_2.present(item);
        }
    };
    CardapioPage.prototype.callQueryCode = function (item) {
        var _this = this;
        var data = new Date().toISOString();
        var json = "{\"usuario\":\"" + this._user[0].id + "\",\"data_compra\":\"" + data + "\"}";
        this.data = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=' + json;
        var myOrder = {
            pedido: this.drinks,
            qr_code: {
                is_valid: true,
                qr_code: "" + this.data,
                usuario: this._user[0].id,
            },
            usuario: this._user[0].id,
            gelo: item.gelo,
            data_compra: data,
        };
        console.log('AHAHAHA', JSON.stringify(myOrder));
        this._http
            .post("http://dev-pi2-api.herokuapp.com/compra/", myOrder, this.options).subscribe(function (data) {
            _this.loadQRCode();
            console.log(data);
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */]);
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_querycode_querycode__["a" /* QuerycodePage */], { 'string': this.data });
        modal.present();
    };
    CardapioPage.prototype.validateCustomDrink = function () {
        this.total = 0;
        for (var bebida in this.levelvalue) {
            this.total += this.levelvalue[bebida];
            if (this.total > 100) {
                console.log('PASSOU!');
                this.levelvalue[bebida] -= 10;
                if (this.levelvalue[bebida] < 0) {
                    this.levelvalue[bebida] = 0;
                }
            }
            this.totalPrice = 0;
            for (var preco in this.bebidas) {
                console.log('TEST1:', Object.keys(this.levelvalue)[index]);
                for (var index in Object.keys(this.levelvalue)) {
                    if (this.bebidas[preco].nome == Object.keys(this.levelvalue)[index]) {
                        var mlPrice = (this.bebidas[preco].preco / this.bebidas[preco].volume);
                        var relativePrice = this.bebidasCustomSize * (Object.values(this.levelvalue)[index] / 100);
                        this.totalPrice += mlPrice * relativePrice;
                        console.log('PREÇO TOTAL: ', this.totalPrice);
                        console.log('FORA OUTRO O VOLUME DE ', Object.keys(this.levelvalue)[index], 'É EXATAMENTE: ', Object.values(this.levelvalue)[index]);
                    }
                }
            }
        }
    };
    CardapioPage.prototype.checkoutCustomDrink = function () {
        var _this = this;
        console.log('O VOLUME TOTAL É: ', this.total);
        if (this.bebidasCustom.length == 0) {
            var alert_3 = this._alertCtrl.create({
                title: 'OPS!',
                subTitle: 'Você não escolheu as bebidas!',
                buttons: ['OK']
            });
            alert_3.present();
        }
        else if (this.bebidasCustomSize == null) {
            var alert_4 = this._alertCtrl.create({
                title: 'OPS!',
                subTitle: 'Você não escolheu o tamanho do seu drink!',
                buttons: ['OK']
            });
            alert_4.present();
        }
        else if (this.total < 100) {
            var alert_5 = this._alertCtrl.create({
                title: 'OPS!',
                subTitle: 'O volume de sua bebida precisa ser 100%!',
                buttons: ['OK']
            });
            alert_5.present();
        }
        else {
            this.loader = this._loadingCtrl.create({
                content: 'Processando pagamento...'
            });
            this.loader.present();
            for (var index in Object.keys(this.levelvalue)) {
                var exists = false;
                var pedido = {
                    bebida_name: Object.keys(this.levelvalue)[index],
                    volume: ((Object.values(this.levelvalue)[index] * this.bebidasCustomSize) / 100)
                };
                for (var i = 0; i < this.drinks.length; i++) {
                    if (this.drinks[i].bebida_name === pedido.bebida_name) {
                        this.drinks[i].volume = pedido.volume;
                        exists = true;
                    }
                }
                if (exists == false) {
                    this.drinks.push(pedido);
                }
            }
            console.log('AQUI O PEDIDO:', pedido);
            this.drinks;
            var drinkJson = {
                preco: this.totalPrice,
                gelo: this.isToggled,
                tamanho: this.bebidasCustomSize
            };
            this._http
                .get("http://dev-pi2-api.herokuapp.com/users/?email=" + this._userService.getEmailLoggedUser(), this.options)
                .map(function (res) { return res.json(); })
                .toPromise()
                .then(function (_user) {
                _this._user = _user;
                console.log('RETORNEI ISSO: ', _this._user);
                _this.processDrink(drinkJson);
            });
        }
    };
    CardapioPage.prototype.trackByIndex = function (index, obj) {
        return index;
    };
    CardapioPage.prototype.callQueryCodeWithString = function (qr_code) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_querycode_querycode__["a" /* QuerycodePage */], { 'string': qr_code });
        modal.present();
    };
    CardapioPage.prototype.ionViewWillEnter = function () {
        this.loadQRCode();
    };
    CardapioPage.prototype.loadQRCode = function () {
        var _this = this;
        this._http
            .get("http://dev-pi2-api.herokuapp.com/compra/?usuario=" + this._userService.getIDLoggedUser(), this.options)
            .map(function (res) { return res.json(); })
            .toPromise()
            .then(function (_myQrCodes) {
            _this._myQrCodes = _myQrCodes.reverse();
            console.log('RETORNEI ISSO: ', _this._myQrCodes);
        });
    };
    return CardapioPage;
}());
CardapioPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cardapio',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/cardapio/cardapio.html"*/'<ion-header>\n  <ion-toolbar no-border-top>\n    <ion-segment [(ngModel)]="pet" color="dark">\n      <ion-segment-button value="puppies" color="dark">\n        Cardápio\n      </ion-segment-button>\n      <ion-segment-button value="kittens">\n        Personalizar\n      </ion-segment-button>\n      <ion-segment-button value="ducklings">\n        Meus Drinks\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="card-background-page">\n\n\n  <div [ngSwitch]="pet">\n    <ion-list *ngSwitchCase="\'puppies\'">\n      <ion-list>\n        <div>\n          <ion-card class="animated bounceInLeft" *ngFor="let item of cardapio let i = index" (click)="detailDrink({drink: item, image: images[i]})">\n            <img class="img-circle" src="{{ images[i] }}">\n            <div class="card-title">{{ item.nome }}</div>\n            <div class="card-subtitle">{{ item.volume }}ml R{{ item.preco | currency : \'usd\' : true }}</div>\n          </ion-card>\n        </div>\n      </ion-list>\n    </ion-list>\n\n\n    <ion-list *ngSwitchCase="\'kittens\'">\n      <div class="animated bounceInDown">\n        <ion-item-divider style="text-align: center;" color="light">\n          Escolha suas bebidas\n        </ion-item-divider>\n        <ion-item>\n          <ion-label>Bebidas:</ion-label>\n          <ion-select [(ngModel)]="bebidasCustom" multiple="true">\n            <ion-option *ngFor="let item of bebidas">{{item.nome}}</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <div *ngFor="let bebida of bebidasCustom">\n          <ion-item-divider *ngIf="bebidasCustom" style="text-align: center;" color="light">{{ bebida }} {{ this.levelvalue[bebida]}}%</ion-item-divider>\n          <ion-item ng-model="levelvalue" *ngIf="bebidasCustom">\n            <ion-range [(ngModel)]="levelvalue[bebida]" (ionChange)="validateCustomDrink($event)" min="0" max="100" step="10" pin="true">\n              <ion-icon range-left small name="wine"></ion-icon>\n              <ion-icon range-right big large name="wine"></ion-icon>\n            </ion-range>\n          </ion-item>\n        </div>\n\n\n\n        <ion-item>\n          <ion-label>Gelo?</ion-label>\n          <ion-toggle checked="false" [(ngModel)]="isToggled"></ion-toggle>\n        </ion-item>\n\n        <ion-item-divider *ngIf="bebidasCustomSize" style="text-align: center; color:darkred; font-weight: bold;">\n          Total: R{{ this.totalPrice | currency : \'USD\' : true}} 300 ml! \n        </ion-item-divider>\n        <button class="animated bounceInUp" ion-button block color="dark" (click)="checkoutCustomDrink()">Finalizar Pedido</button>\n      </div>\n\n    </ion-list>\n\n\n    <ion-list *ngSwitchCase="\'ducklings\'">\n      <ion-item class="animated bounceInRight" *ngFor="let qr of _myQrCodes" (click)="callQueryCodeWithString(qr.qr_code.qr_code)">\n        <h2>{{ qr.nome }}</h2>\n        <p *ngFor="let qri of qr.pedido">{{ (qri.volume * 100 )/400}}% {{ qri.bebida_name }}</p>\n      </ion-item>\n    </ion-list>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/cardapio/cardapio.html"*/,
    }),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__domain_cardapio_cardapio__["a" /* Cardapio */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__domain_user_user_service__["a" /* UserService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
], CardapioPage);

//# sourceMappingURL=cardapio.js.map

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = (function () {
    function HomePage(navCtrl, _service) {
        this.navCtrl = navCtrl;
        this._service = _service;
    }
    Object.defineProperty(HomePage.prototype, "loggedUser", {
        get: function () {
            return this._service.getLoggedUser();
        },
        enumerable: true,
        configurable: true
    });
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/home/home.html"*/'<ion-header>\n    <ion-toolbar>\n      <ion-title class="top">SunBar!</ion-title>\n    </ion-toolbar>\n  </ion-header>\n<ion-content padding="true" style="background: url(https://i.pinimg.com/originals/a9/96/d9/a996d9678809484c1c6d995d8625ab27.jpg) no-repeat center;background-size:cover;" >\n    <img  class="img animated fadeIn" style="" src="https://icon-icons.com/icons2/365/PNG/256/kitten-icon_36975.png">\n  <h2 class="title2 animated fadeIn">Olá {{ loggedUser.first_name }}!</h2>\n  <h2 class="title2 animated fadeIn">Créditos: R{{ loggedUser.creditos | currency : \'USD\' : true}}!</h2>\n</ion-content>\n'/*ion-inline-end:"/Users/eduardocastro/Library/Mobile Documents/com~apple~CloudDocs/Documents/programming/ionic/drink_app_stripe/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__domain_user_user_service__["a" /* UserService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ })

},[214]);
//# sourceMappingURL=main.js.map
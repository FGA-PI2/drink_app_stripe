import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DrinkDetailPage } from '../pages/drink-detail/drink-detail';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { UserService } from '../domain/user/user-service';
import { BebidaService } from '../domain/bebida/bebida-service';
import { Cardapio } from '../domain/cardapio/cardapio';
import { QuerycodePage } from '../pages/querycode/querycode';
import { AdminPage } from '../pages/admin/admin';
import { HomePage } from '../pages/home/home';
import { CreditosPage } from '../pages/creditos/creditos';
import { HistoricoPage } from '../pages/historico/historico';
import { Stripe } from '@ionic-native/stripe';
import { PayPalPage } from '../pages/paypal/paypal';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    CardapioPage,
    DrinkDetailPage,
    QuerycodePage,
    AdminPage,
    HomePage,
    CreditosPage,
    HistoricoPage,
    PayPalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    MenuPage,
    CardapioPage,
    DrinkDetailPage,
    QuerycodePage,
    AdminPage,
    HomePage,
    CreditosPage,
    HistoricoPage,
    PayPalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    Cardapio,
    BebidaService,
    Stripe,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

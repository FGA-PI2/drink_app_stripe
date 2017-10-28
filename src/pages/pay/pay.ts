import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NoodlioPay } from './noodliopay';

import { IonicPage, NavParams,AlertController, ModalController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';

@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
  providers: [NoodlioPay]
})

export class PayPage {

  constructor(
    public navCtrl: NavController, 
    private NoodlioPay: NoodlioPay,
    public navParams: NavParams, 
    private _userService: UserService, 
    private _alertCtrl: AlertController,
    public modalCtrl: ModalController,
    ) {}

  /**
  * Init
  */
  inputForm = {
    currency: 'BRL',
    amountCents: 500,
    date: this.todayFormatted(),   // init
    number: 4242424242424242,      // remove this for production
    name: "João da Silva Sauro",           // remove this for production
    cvc: 123,                      // remove this for production
  }
  status = {
    message: '',
    loading: false,
    success: null,
  }

  /**
  * fn Charge Card
  */
  charge() {

    // obtain the exp_month and exp_year
    var split = this.inputForm['date'].split('-');
    this.inputForm['exp_month'] = split[1];
    this.inputForm['exp_year']  = split[0];

    // validate the card details and process the payment
    this.status['message'] = '';
    this.status['loading'] = true;
    this.status['success'] = null;
    this.NoodlioPay.charge(this.inputForm).subscribe(
      data => {
        console.log(data)
        this.status['message'] = data.message || 'Pagamento processado!';
        this.status['loading'] = false;
        if (data.hasOwnProperty('id')) {
          this.status['success'] = true;
          this._userService.updateCreditosCartao(this.inputForm['amountCents'], true);
        }
      },
      error => {
        console.log(error);
        this.status['message'] = 'Oops... something went wrong.';
        this.status['loading'] = false;
        this.status['success'] = false;
      }
    );
  };

  buyCredits(){
    this._alertCtrl.create({
      title: 'Atenção!',
      buttons: [{ text: 'Cancelar' },{ text: 'OK', handler: () => {
        this._userService.updateCreditos(this.inputForm['amountCents'], true);
      }}],
      subTitle: `Deseja comprar ${this.inputForm['amountCents']} reais em créditos?`
    }).present();
  }


  /*
  * Helper functions
  */
  todayFormatted() {
    var d = new Date();
    var m = d.getMonth()+1;
    var y = d.getFullYear();
    if (m < 10) {
      return y + '-0' + m;
    } else {
      return y + '-' + m;
    }
  }




}

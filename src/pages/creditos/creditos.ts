import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, ModalController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';
import { PayPage } from '../pay/pay';

@IonicPage()
@Component({
  selector: 'page-creditos',
  templateUrl: 'creditos.html',
})
export class CreditosPage {
  
  payPage = PayPage;
  private _credits: number;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private _userService: UserService, 
    private _alertCtrl: AlertController,
    public modalCtrl: ModalController,
    ) {
  }

  buyCredits(){
    this._alertCtrl.create({
      title: 'Atenção!',
      buttons: [{ text: 'Cancelar' },{ text: 'OK', handler: () => {
        this._userService.updateCreditos(this._credits, true);
      }}],
      subTitle: `Deseja comprar ${this._credits} reais em créditos?`
    }).present();
  }

  goToPaymentsPage(){
    let modal = this.modalCtrl.create(PayPage);
        modal.present();
    
  }
}
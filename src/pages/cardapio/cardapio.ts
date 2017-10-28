import { Component,Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Cardapio } from '../../domain/cardapio/cardapio';
import { UserService } from '../../domain/user/user-service';
import { Bebida } from '../../domain/bebida/bebida';
import { DrinkDetailPage } from '../../pages/drink-detail/drink-detail';
import { Platform } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { QuerycodePage } from '../../pages/querycode/querycode';
import { MenuPage } from '../../pages/menu/menu';
import { HomePage } from '../../pages/home/home';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})

@Injectable()
export class CardapioPage {

  private _myQrCodes;
  public images;
  public total = 0;
  public cardapio;
  private _user;
  public data: string;
  public loader;
  pet: string = "puppies";
  isAndroid: boolean = false;
  public bebidas;
  public bebidasCustom: Bebida[] = [];
  public levelvalue = [];
  public isToggled;
  public totalCustomDrink = 0;
  private _toast;
  public bebidasCustomSize = 400;
  public totalPrice = 0;
  public drinks = [];
  public headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Authorization': this._userService.getToken()

    });
  public options = new RequestOptions({ headers: this.headers });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _cardapio: Cardapio,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _userService: UserService,
    public modalCtrl: ModalController,
    private _http: Http,
    platform: Platform,
    public toastCtrl: ToastController

  ) {
    this.images = this._cardapio.getImages()
    this.loader = this._loadingCtrl.create({
      content: 'Carregando...'
    })
    this.loader.present()

    this.loadQRCode()
    this._http.get(`http://dev-pi2-api.herokuapp.com/drink/`, this.options).subscribe(data => {
      this.cardapio = JSON.parse((data['_body']));
      console.log('Drinks:', this.cardapio);
      this._http.get(`http://dev-pi2-api.herokuapp.com/bebida/`, this.options).subscribe(data => {
        this.bebidas = JSON.parse((data['_body']));
        this.levelvalue = [];
        console.log('BEBIDAS MAN:', this.bebidas);
        this.loader.dismiss()
      })
    })

  }


  detailDrink(drink, image) {
    let modal = this.modalCtrl.create(DrinkDetailPage, { 'drink': drink, 'image': image });
    modal.present();
  }

  buyDrink(item) {
    this.loader = this._loadingCtrl.create({
      content: 'Processando pagamento...'
    })
    this._alertCtrl.create({
      title: 'ATENÇÃO!',
      subTitle: `Deseja comprar ${item.nome} por ${item.preco}?`,
      buttons: [{ text: 'Cancelar' }, {
        text: 'Comprar', handler: () => {
          this.loader.present()
          setTimeout(() => {
            this.loader.dismiss()
            this.processDrink(item);
          }, 1000);
        }
      }]
    }).present()
    console.log(item)
  }

  processDrink(item) {
    if (this._user[0].creditos < item.preco) {
      this.loader.dismiss()
      let alert = this._alertCtrl.create({
        title: 'OPS!',
        subTitle: 'Você não possui créditos suficiente!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.loader.dismiss()
      this._userService.updateCreditos(item.preco, false);
      let alert = this._alertCtrl.create({
        title: 'Sucesso!',
        subTitle: 'Sua Bebida foi comprada!',
        buttons: [{
          text: 'OK', handler: () => {
            this.callQueryCode(item)
          }
        }]
      });
      alert.present(item);
    }
  }

  callQueryCode(item) {
    let data = new Date().toISOString()
    let json = `{"usuario":"${this._user[0].id}","data_compra":"${data}"}`
    this.data = 'https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=' + json
    let myOrder = {
      pedido: this.drinks,
      qr_code: {
        is_valid: true,
        qr_code: `${this.data}`,
        usuario: this._user[0].id,
      
      },
      usuario: this._user[0].id,
      gelo: item.gelo,
      data_compra: data,
    }
    console.log('AHAHAHA', JSON.stringify(myOrder))
    this._http
      .post(`http://dev-pi2-api.herokuapp.com/compra/`, myOrder, this.options).subscribe(data => {
        this.loadQRCode()
        console.log(data);
      });
      this.navCtrl.push(HomePage);
    let modal = this.modalCtrl.create(QuerycodePage, { 'string': this.data });
    modal.present();
  }


  validateCustomDrink() {
    this.total = 0;
    for (var bebida in this.levelvalue) {
      this.total += this.levelvalue[bebida];
      if (this.total > 100) {
        console.log('PASSOU!');
        this.levelvalue[bebida] -= 10;
        if(this.levelvalue[bebida] < 0){
          this.levelvalue[bebida] = 0;
        }
      }
      this.totalPrice = 0;
      for (var preco in this.bebidas) {
        console.log('TEST1:', Object.keys(this.levelvalue)[index]);
        for (var index in Object.keys(this.levelvalue)) {
          if (this.bebidas[preco].nome == Object.keys(this.levelvalue)[index]) {
            let mlPrice = (this.bebidas[preco].preco / this.bebidas[preco].volume);
            let relativePrice = this.bebidasCustomSize * ((<any>Object).values(this.levelvalue)[index] / 100);
            this.totalPrice += mlPrice * relativePrice;
            console.log('PREÇO TOTAL: ', this.totalPrice);
            console.log('FORA OUTRO O VOLUME DE ', Object.keys(this.levelvalue)[index], 'É EXATAMENTE: ', (<any>Object).values(this.levelvalue)[index]);
          }
        }
      }
    }
  }

  checkoutCustomDrink() {
    console.log('O VOLUME TOTAL É: ', this.total)
    if (this.bebidasCustom.length == 0) {
      let alert = this._alertCtrl.create({
        title: 'OPS!',
        subTitle: 'Você não escolheu as bebidas!',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.bebidasCustomSize == null) {
      let alert = this._alertCtrl.create({
        title: 'OPS!',
        subTitle: 'Você não escolheu o tamanho do seu drink!',
        buttons: ['OK']
      });
      alert.present();
    } else if (this.total < 100) {
      let alert = this._alertCtrl.create({
        title: 'OPS!',
        subTitle: 'O volume de sua bebida precisa ser 100%!',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.loader = this._loadingCtrl.create({
        content: 'Processando pagamento...'
      })
      this.loader.present()
      for (var index in Object.keys(this.levelvalue)) {
        var exists = false;
        var pedido = {
          bebida_name: Object.keys(this.levelvalue)[index],
          volume: (((<any>Object).values(this.levelvalue)[index] *this.bebidasCustomSize) / 100)
        }
        for (var i=0; i < this.drinks.length; i++) {
          if (this.drinks[i].bebida_name === pedido.bebida_name) {
              this.drinks[i].volume = pedido.volume
              exists = true
          }
        }
        if(exists == false){
          this.drinks.push(pedido);
        }
      }
      console.log('AQUI O PEDIDO:', pedido)
      this.drinks
      var drinkJson = {
        preco: this.totalPrice,
        gelo: this.isToggled,
        tamanho: this.bebidasCustomSize
      }
      this._http
        .get(`http://dev-pi2-api.herokuapp.com/users/?email=${this._userService.getEmailLoggedUser()}`, this.options)
        .map(res => res.json())
        .toPromise()
        .then(_user => {
          this._user = _user
          console.log('RETORNEI ISSO: ', this._user);
          this.processDrink(drinkJson);
        });
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  callQueryCodeWithString(qr_code) {
    let modal = this.modalCtrl.create(QuerycodePage, { 'string': qr_code });
    modal.present();
  }


  ionViewWillEnter(){
    this.loadQRCode()
  }


  loadQRCode(){
    this._http
    .get(`http://dev-pi2-api.herokuapp.com/compra/?usuario=${this._userService.getIDLoggedUser()}`, this.options)
    .map(res => res.json())
    .toPromise()
    .then(_myQrCodes => {
      this._myQrCodes = _myQrCodes.reverse()
      console.log('RETORNEI ISSO: ', this._myQrCodes);
    });
  }

}

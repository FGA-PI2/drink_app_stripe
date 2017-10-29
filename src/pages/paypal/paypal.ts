import { Component } from '@angular/core';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { UserService } from '../../domain/user/user-service';
import { Config } from '../../config';

@Component({
	selector: 'page-paypal',
	templateUrl: 'paypal.html'
})



export class PayPalPage {
	constructor(private payPal: PayPal) {
  	}

	payment: PayPalPayment = new PayPalPayment('10.10', 'BRL', 'TV', 'sale');
	currencies = ['BRL'];
	payPalEnvironment: string = 'payPalEnvironmentSandbox';

	makePayment() {
		this.payPal.init({
			PayPalEnvironmentProduction: Config.payPalEnvironmentProduction,
			PayPalEnvironmentSandbox: Config.payPalEnvironmentSandbox
		}).then(() => {
			this.payPal.prepareToRender(this.payPalEnvironment, new PayPalConfiguration({})).then(() => {
				this.payPal.renderSinglePaymentUI(this.payment).then((response) => {
					alert(`Successfully paid. Status = ${response.response.state}`);
					console.log(response);
				}, () => {
					console.error('Error or render dialog closed without being successful');
				});
			}, () => {
				console.error('Error in configuration');
			});
		}, () => {
			console.error('Error in initialization, maybe PayPal isn\'t supported or something else');
		});
	}
}
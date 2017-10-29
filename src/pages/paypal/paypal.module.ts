import { IonicModule } from 'ionic-angular';
import { IonicPageModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { PayPalPage } from './paypal';

@NgModule({
	imports: [
    	IonicPageModule.forChild(PayPalPage),
		],
	declarations: [
		PayPalPage
	],
	entryComponents: [
		PayPalPage
	],
})
export class PayPalModule {

}
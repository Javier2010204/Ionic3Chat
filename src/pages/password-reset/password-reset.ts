import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    
  }

  passwordReset(){
    this.userProvider.passwordReset(this.email).then((res:any) => {
      let alert = this.alertCtrl.create({
        buttons: ['Ok']
      });
      if(res.success){
        alert.setTitle('Correo enviado');
        alert.setSubTitle('Por favor revisa tu correo para ver las instrucciones para obtener tu nueva contraseña');
        alert.present();
      }else{
        alert.setTitle('Error al enviar el correo');
        alert.present();
      }
    })
  }

  goBack(){
    this.navCtrl.setRoot('LoginPage');
  }

}

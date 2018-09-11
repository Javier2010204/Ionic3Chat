import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser = {
    email: '',
    password: '',
    userName: '' 
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider : UserProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  signup(){
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if(this.newUser.email == '' || this.newUser.password == '' || this.newUser.userName == ''){
      toaster.setMessage('All field are required dude');
      toaster.present();
    }else if(this.newUser.password.length < 7){
      toaster.setMessage('Password is not strong. Try giving more that six caracters');
      toaster.present();
    }else{
      let loader = this.loadingCtrl.create({
        content: 'Plese wait'
      });
      loader.present();
      this.userProvider.addUser(this.newUser).then( (res : any) => {
        loader.dismiss();
        if(res.success){
          this.navCtrl.push('ProfilepicPage')
        }else{
          alert('Error: ' + res);
        }
      })
    }
  }

  goBack(){
    this.navCtrl.setRoot('LoginPage');
  }

}

import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ImageHandlerProvider } from '../../providers/image-handler/image-handler';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ProfilepicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {
  
  imgUrl='https://firebasestorage.googleapis.com/v0/b/ionic3chat-676c6.appspot.com/o/default-user.png?alt=media&token=c38e2c29-6829-4247-921f-1db132287d2d';

  moveon = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public imageHandler : ImageHandlerProvider, public zone : NgZone, public userProvider : UserProvider, public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {

  }

  chooseImage(){
    this.imageHandler.uploadImage().then((uploadedUrl:any) => {
      this.zone.run(() => {
        this.imgUrl = uploadedUrl;
        this.moveon = false;
      })
    })
  }

  updateProceed(){
    this.userProvider.updateImage(this.imgUrl).then((res:any) => {
      if(res.success){
        this.navCtrl.setRoot('TabsPage');
      }else{
        let alert = this.alertCtrl.create({
          buttons:['Ok']
        });
        alert.setTitle('Fallo ' + res);
        alert.present();
      }
    })
  }

  proceed(){
    this.navCtrl.setRoot('TabsPage');
  }

}

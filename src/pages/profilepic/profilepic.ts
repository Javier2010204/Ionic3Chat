import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public imageHandler : ImageHandlerProvider, public zone : NgZone, public userProvider : UserProvider, public loaderCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  chooseImage(){
    let loader = this.loaderCtrl.create({
      content: 'Por favor espere...'
    });
    loader.present();
    this.imageHandler.uploadImage().then((uploadedUrl:any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgUrl = uploadedUrl;
        this.moveon = false;
      })
    })
  }

  updateProceed(){
    let loader = this.loaderCtrl.create({
      content: 'Por favor espere...'
    });
    loader.present();
    this.userProvider.updateImage(this.imgUrl).then((res:any) => {
      loader.dismiss();
      if(res.success){
        this.navCtrl.setRoot('TabsPage');
      }else{
        alert(res);
      }
    })
  }

  proceed(){
    this.navCtrl.setRoot('TabsPage');
  }

}

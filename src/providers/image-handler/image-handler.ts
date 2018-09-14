import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ImageHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageHandlerProvider {

  nativePath : any;
  firestore = firebase.storage();


  constructor(public fileChooser: FileChooser, public alertCtrl : AlertController) {

  }

  uploadImage(){
    var promise = new Promise((resolve, reject) => {
      this.fileChooser.open().then((url) => {
        let alert = this.alertCtrl.create({
          buttons: ['Ok']
        });
        (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativePath = result;
          (<any>window).resolveLocalFileSystemURL(this.nativePath, (res) => {
            res.file((resFile) => {
              var reader = new FileReader();
              reader.readAsArrayBuffer(resFile);
              reader.onloadend = (evt:any) => {
                var imgBlob = new Blob([evt.target.result],{type: 'image/jpge'});
                var imageStore = this.firestore.ref('/profileImages').child(firebase.auth().currentUser.uid);
                imageStore.put(imgBlob).then((res) => {
                  this.firestore.ref('/profileImages').child(firebase.auth().currentUser.uid).getDownloadURL().then((url) => {
                    alert.setTitle('Actualizacion exitosa');
                    alert.present();
                    resolve(url);
                  }).catch((err) => {
                    alert.setTitle('Falla en la actualizacion ' + err);
                    alert.present();
                    reject(err);
                  })
                }).catch((err) => {
                  alert.setTitle('Falla en la actualizacion ' + err);
                  alert.present();
                  reject(err);
                })
              }
            })
          })
        })
      })
    })
    return promise;
  }

}

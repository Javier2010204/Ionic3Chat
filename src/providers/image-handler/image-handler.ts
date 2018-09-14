import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import * as firebase from 'firebase';

/*
  Generated class for the ImageHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageHandlerProvider {

  nativePath : any;
  firestore = firebase.storage();


  constructor(public fileChooser: FileChooser) {

  }

  uploadImage(){
    
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/chatusers');

  constructor(public afireauth : AngularFireAuth) {

  }

  addUser(newUser){
    var promise = new Promise( (resolve, reject) => {
      this.afireauth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password).then( () => {
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newUser.userName,
          photoURL: ''
        }).then( () => {
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newUser.userName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/ionic3chat-676c6.appspot.com/o/default-user.png?alt=media&token=c38e2c29-6829-4247-921f-1db132287d2d'
          }).then( () => {
            resolve({success: true})
          }).catch( (err) => {
            reject(err);
          })
        }).catch( (err) => {
          reject(err);
        })
      }).catch( (err) => {
        reject(err);
      })
    })
    return promise;
  }

  passwordReset(email: string){
    // send email for reset password
    var promise = new Promise( (resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then( () => {
        resolve({success: true})
      }).catch((err) => {
        reject(err);
      })  
    })
    return promise;
  }


}

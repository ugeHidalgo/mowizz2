import { Injectable } from '@angular/core';
import { Setup } from '../models/setup.model';

@Injectable()
export class GlobalsService {

  setup : Setup = new Setup;
  userNameLogged: string;
  localStorageStore = 'currentUser';
  server = 'http://192.168.1.25:3000/';  //To be used in production
  //server = 'http://localhost:3000/';  // To be used in development mode and without connection to any network

  constructor( ) { }

  setUser(userName: string) {
    const me = this;
    me.userNameLogged = userName;
  }

  setSetup(setup: Setup) {
    const me = this;

    me.setup._id = setup._id;
    me.setup.recoveryMail = setup.recoveryMail;
    me.setup.recoveryMailPassword = setup.recoveryMailPassword;
  }

  clearUser() {
    const me = this;
    me.userNameLogged = undefined;
  }

  storeUserDataInLocalStorage(userName, token) {
    localStorage.setItem(this.localStorageStore, JSON.stringify({
      app: 'mowizz2',
      username: userName,
      token: token
    }));
  }

  getUserDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.localStorageStore));
  }

  getUserNameFromLocalStorage() {
    const me = this,
          userData = me.getUserDataFromLocalStorage();

    return userData ? userData.username : '';
  }

  getTokenFromLocalStorage() {
    const me = this,
          userData = me.getUserDataFromLocalStorage();

    return userData ? userData.token : '';
  }

  removeUserDataFromLocalStorage() {
    localStorage.removeItem(this.localStorageStore);
  }

}

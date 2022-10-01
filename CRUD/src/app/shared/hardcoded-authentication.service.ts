import { Injectable } from '@angular/core';
import {LoginComponent} from '../login/login.component'
@Injectable({
  providedIn: 'root'
})
export class HardcodedAuthenticationService {

  constructor() { }
  authenticate(username:any,password:any){
    console.log('before ' + this.IsUserLoggedIn());
    if ( username === 'Admin' && password === 'Admin'){
      
      sessionStorage.setItem('authenticaterUser', username);
      sessionStorage.setItem('password',password)
      console.log('after ', this.IsUserLoggedIn());
      alert("Logged In")
      return true;
    }
    return false;
  }

  IsUserLoggedIn() {
    let user = sessionStorage.getItem('authenticaterUser')
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem('authenticaterUser');
  }

  updatePassword(password:any){
    sessionStorage.setItem('password',password);
  }
}

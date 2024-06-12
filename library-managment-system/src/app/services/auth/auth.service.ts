import { Injectable, inject, signal } from '@angular/core';
import { Auth ,createUserWithEmailAndPassword , updateProfile , signInWithEmailAndPassword , signOut ,user} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { IUser, IUserLogin, IUserSignup } from '../../models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fireBaseAuth=inject(Auth);
  user$=user(this.fireBaseAuth);
  currentUserSig=signal<IUser|null|undefined>(undefined);

  register({email,username,password}:IUserSignup):Observable<any>{
    // const promise=createUserWithEmailAndPassword(this.fireBaseAuth,email,password)
    // .then((userCredential)=>{
    //   return updateProfile(userCredential.user,{displayName:username});
    // })
    return from(createUserWithEmailAndPassword(this.fireBaseAuth,email,password));
  }

  login({email,password}:IUserLogin):Observable<any>{
    return from(signInWithEmailAndPassword(this.fireBaseAuth,email,password));
  }

  logout():Observable<any>{
    return from(signOut(this.fireBaseAuth));
  }
}



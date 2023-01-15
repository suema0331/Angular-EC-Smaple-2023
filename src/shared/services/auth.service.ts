import { Injectable, Optional } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { authState } from 'rxfire/auth';
import { LocationService } from 'src/app/service/utilities/location.service';
import { UserCreateRequest } from 'src/backend/dto/common/user_create_request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user$ = this.auth.currentUser;
  currentUser = {} as User;

  constructor(
     // Tell Angular that dependencies are optional
    @Optional() private auth: Auth,
    private afs: AngularFirestore,
    private locationService: LocationService,
  ) {

    // Setting logged in user in localstorage else null
    authState(this.auth).subscribe((user) => {
      console.log(user)
      if (user) {
        this.currentUser = user
      }
      // To store (only some information) in local storage
        // localStorage.setItem('user', JSON.stringify(user));
        // JSON.parse(localStorage.getItem('user')!);
      // } else {
      //   localStorage.setItem('user', 'null');
      //   JSON.parse(localStorage.getItem('user')!);
      // }
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        console.log(result)
        return result
      })
      .catch((error) => {
        throw new Error(error)
      });
      ;
  }

  logout() {
    return signOut(this.auth).then(() => {
      // localStorage.removeItem('user');
      localStorage.removeItem('user');
      this.locationService.navigateTo1_1()
    });
  }

  // Sign up with email/password
  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (result) => {
        console.log(result)
        const newUser = this.auth.currentUser as User
        //updateProfileメソッドでdisplayNameに情報を登録
        await updateProfile(newUser, {
          displayName: newUser.email?.split('@')[0] ?? 'Anonymous',
          // License: Multiavatar  https://api.multiavatar.com/
          photoURL: `https://api.multiavatar.com/${Math.floor(Math.random()*1000)}.png`,
        })

        /* Call the SendVerificaitonMail() function when new user signup and returns promise */
        this.sendVerificationMail().catch(error => alert(error.message))

        this.setUserData(result.user).catch(error => alert(error.message));

        // this.locationService.navigateTo1_1()
        return result
      })
      .catch((error) => {
        // alert(error.message);
        throw new Error(error)
      });
  }
  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return sendEmailVerification(this.auth.currentUser as User);
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef = this.afs.doc(`users/${user.uid}`);
    const userData: UserCreateRequest = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  get user() {
    return user(this.auth);
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    console.log('isLoggedin')
    console.log( this.user ? true : false)
    return this.user ? true : false;
  }

  getAuthState() {
    return authState(this.auth);
  }
}

import { Injectable, Optional } from '@angular/core';
import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { authState } from 'rxfire/auth';
import { UserCreateRequest } from 'src/backend/dto/common/user_create_request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = {} as User;

  constructor(
    // Tell Angular that dependencies are optional
    @Optional() private auth: Auth,
    private afs: AngularFirestore
  ) {
    // Setting logged in user in localstorage else null
    authState(this.auth).subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
      // To store (only some information) in local storage. (Not used at this time.)
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
        if (result.user.displayName?.includes('test')) {
          alert('💙Thank you for logged in as a VIP user!');
        }
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  logout() {
    return signOut(this.auth)
      .then((result) => {
        this.currentUser = {} as User;
        // localStorage.removeItem('user');
        console.log('🌟loggeed out');
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  // Sign up with email/password
  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (result) => {
        const newUser = this.auth.currentUser as User;

        await updateProfile(newUser, {
          displayName: newUser.email?.split('@')[0] ?? 'Anonymous',
          /**
           * License: Multiavatar  https://api.multiavatar.com/
           */
          photoURL: `https://api.multiavatar.com/${Math.floor(
            Math.random() * 1000
          )}.png`,
        });

        /* Call the SendVerificaitonMail() function when new user signup and returns promise */
        this.sendVerificationMail().catch((error) => alert(error.message));
        this.setUserData(result.user).catch((error) => alert(error.message));
        return result;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return sendEmailVerification(this.auth.currentUser as User);
  }

  // Use the AngularFirestore + AngularFirestoreDocument service to set up user data when signing in to the Firestore database with a username/password.
  setUserData(user: User) {
    const userRef = this.afs.doc(`users/${user.uid}`);
    const userData: UserCreateRequest = {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
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
    return this.currentUser.uid ? true : false;
  }

  getAuthState() {
    return authState(this.auth);
  }
}

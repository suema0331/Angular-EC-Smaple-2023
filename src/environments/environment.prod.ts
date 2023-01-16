// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// TODO Connect to firebase for production
export const environment = {
  firebase: {
    projectId: 'my-ec-2023',
    appId: '1:995863562978:web:cae439582538e8787decbb',
    storageBucket: 'my-ec-2023.appspot.com',
    apiKey: 'AIzaSyCVmuRmHUGT2j0w6XxtsP5aAyvIi2ilSa0',
    authDomain: 'my-ec-2023.firebaseapp.com',
    messagingSenderId: '995863562978',
    measurementId: 'G-NT4TSNGS8E',
  },
  production: true,
  remote: true,
  // Assuming you are doing blue green deploy, we can easily change the setting by changing the API_URL from blue to green.
  API_URL: 'https://blue-user.angular-ec-2023.com',
  API_AUTH_URL: 'https://blue-auth.angular-ec-2023.com',
  // IMAGE_DL_FROM_S3 : false,
  // S3_URL : 'https://image.angular-ec-2023.com',
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

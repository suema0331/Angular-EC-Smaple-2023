/**
 * Data input tool for development. Since it was hard to manually input all of the fields in the firebase console, I implemented a tool to register the entire object at once.
 * In this example, `import-datal.js` read `./data/products.json` and registers the products to the `products` collection in firebase.
 */
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');
const { initializeFirebaseApp, restore } = require('firestore-export-import');

initializeFirebaseApp(serviceAccount, firebaseConfig.appName);

// JSON To Firestore
const jsonToFirestore = async () => {
  try {
    console.log('Initialzing Firebase');
    console.log('Firebase Initialized');

    restore('./data/products.json', {
      autoParseDates: true, // timestamp → Date
    });
    console.log('Upload Success');
  } catch (error) {
    console.log(error);
  }
};

jsonToFirestore();

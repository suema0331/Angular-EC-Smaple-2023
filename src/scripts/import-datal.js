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


import admin from 'firebase-admin';
import serviceAccount from '../config/ecomudmy-firebase-adminsdk.json' assert { type: 'json' };

const firebaseAdminApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export { firebaseAdminApp };

const admin = require('firebase-admin');
const { getDownloadURL } = require('firebase-admin/storage');

function ensureFirebase() {
  if (admin.apps.length > 0) return;
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'masterrifas-34928.firebasestorage.app',
  });
}

class FirebaseImageAdapter {
  constructor() {
    ensureFirebase();
    this.bucket = admin.storage().bucket();
  }

  async uploadImage(filePath, destFileName) {
    await this.bucket.upload(filePath, {
      destination: destFileName,
      public: true,
      metadata: { contentType: 'image/jpeg' },
    });
    const file = this.bucket.file(destFileName);
    return await getDownloadURL(file);
  }
}

module.exports = FirebaseImageAdapter;
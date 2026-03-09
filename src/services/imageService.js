const admin = require('firebase-admin');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'masterrifas-34928.firebasestorage.app'
});

const bucket = admin.storage().bucket();

async function uploadImage(filePath, destFileName) {
    console.log(filePath);
    console.log(destFileName);
    console.log('uploading imag');
    await bucket.upload(filePath, {
        destination: destFileName,
        public: true, // Opcional: hace la imagen pública inmediatamente
        metadata: {
            contentType: 'image/jpeg',
        },
    });
    const file = bucket.file(destFileName);
    const downloadURL = await getDownloadURL(file);
    return downloadURL;

}
module.exports = { uploadImage };
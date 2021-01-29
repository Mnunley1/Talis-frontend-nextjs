const admin = require('firebase-admin');
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
admin.initializeApp();

//Sendgrid Config
const sgMail = require('@sendgrid/mail');
const API_KEY = functions.config().sendgrid.key;
sgMail.setApiKey(API_KEY);

//Algolia Search Config
const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('Talis_Development');

//Functions

//Algolia Functions
exports.addToIndex = functions.firestore
  .document('fl_content/{listingId}')

  .onCreate((snapshot) => {
    const data = snapshot.data();
    //const objectID = snapshot.id;
    //const photo_main = data.mainImage;
    const listingObject = {
      objectID: data.id,
      address: data.address,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      _geoloc: {
        lat: data.location.lat,
        lng: data.location.lng,
      },
      neighborhood: data.neighborhood,
      price: data.price,
      photo_main: data.mainImage,
      title: data.title,
      slug: data.slug,
      listing_type: data.listingType,
    };

    return index.saveObject(listingObject);
  });

exports.updateIndex = functions.firestore
  .document('fl_content/{listingId}')

  .onUpdate((change) => {
    const newData = change.after.data();
    const objectID = change.after.id;
    const listingObject = {
      objectID: newData.id,
      address: newData.address,
      bedrooms: newData.bedrooms,
      bathrooms: newData.bathrooms,
      _geoloc: {
        lat: newData.location.lat,
        lng: newData.location.lng,
      },
      neighborhood: newData.neighborhood,
      price: newData.price,
      photo_main: newData.mainImage,
      title: newData.title,
      slug: newData.slug,
      listing_type: newData.listingType,
    };

    return index.saveObject({ ...listingObject, objectID });
  });

exports.deleteIndex = functions.firestore
  .document('fl_content/{listingId}')

  .onDelete((snapshot) => index.deleteObject(snapshot.id));

//Sendgrid Functions
exports.welcomeEmail = functions.auth.user().onCreate((user) => {
  const msg = {
    to: user.email,
    from: 'donotreply@talisafrica.com',
    templateId: 'd-a68fdbcce84a417b97c004e76c842b03',
    dynamic_template_data: {
      subject: 'Welcome New User!!',
      name: user.displayName,
    },
  };

  return sgMail.send(msg);
});

exports.requestInfoEmail = functions.https.onCall(async (data) => {
  const msg = {
    to: 'mxnunley1@gmail.com',
    from: 'donotreply@talisafrica.com',
    templateId: 'd-0251224ed24d4c6fb0de820de0053336',
    dynamic_template_data: {
      subject: 'Request For More Information',
      name: data.name,
      phoneNumber: data.phoneNumber,
      message: data.text,
    },
  };

  await sgMail.send(msg).catch((err) => {
    console.log(err);
    console.log(err.response.body);
  });

  //Handle errors

  //Response in JSON format
  return { success: true };
});

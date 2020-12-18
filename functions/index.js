const admin = require('firebase-admin');
const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');
admin.initializeApp();

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex('Talis_Development');

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

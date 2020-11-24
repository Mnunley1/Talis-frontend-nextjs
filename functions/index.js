/* const admin = require("firebase-admin");
const functions = require("firebase-functions");
const algoliasearch = require("algoliasearch");
admin.initializeApp();

const APP_ID = functions.config().algolia.app;
const ADMIN_KEY = functions.config().algolia.key;

const client = algoliasearch(APP_ID, ADMIN_KEY);
const index = client.initIndex("TalisTest_test_LISTING_dev");

exports.addToIndex = functions.firestore
  .document("fl_content/{listingId}")

  .onCreate((snapshot) => {
    const data = snapshot.data();
    const objectID = snapshot.id;
    const photo_main = data.mainImage;
    const _geoloc = {
      lat: data.location.lat,
      lng: data.location.lng,
    };

    return index.saveObject({ _geoloc, photo_main, objectID });
  });
 */

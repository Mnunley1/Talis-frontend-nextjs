import { useForceUpdate } from '@chakra-ui/react';
import { db, storage } from '../../firebase';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import styles from '../../styles/Home.module.scss';

// const images = [
//   {
//     original: 'https://picsum.photos/id/1018/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1018/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1015/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1015/250/150/',
//   },
//   {
//     original: 'https://picsum.photos/id/1019/1000/600/',
//     thumbnail: 'https://picsum.photos/id/1019/250/150/',
//   },
// ];

function ListingGallery({ images }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const files = [];
    images.forEach((image) => {
      db.doc(`${image}`)
        .get()
        .then(function (doc) {
          var fileName = doc.data().file;
          storage
            .ref('flamelink/media/' + fileName)
            .getDownloadURL()
            .then(function (url) {
              files.push({ original: `${url}` });
            });
          setItems(files);
        });
    });

    console.log(items);
  }, [images]);

  console.log(items.length);

  return (
    <ImageGallery
      items={items}
      showThumbnails={false}
      showFullscreenButton={true}
      showPlayButton={false}
      showIndex={true}
      lazyLoad={true}
    />
  );
}

export default ListingGallery;

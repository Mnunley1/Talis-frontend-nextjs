import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";


const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

class ListingGallery extends React.Component {
    render() {
        return <ImageGallery
            items={images}
            showThumbnails={false}
            showFullscreenButton={true}
            showPlayButton={false}
            showIndex={true}
            lazyLoad={true} />;
    }
}

export default ListingGallery
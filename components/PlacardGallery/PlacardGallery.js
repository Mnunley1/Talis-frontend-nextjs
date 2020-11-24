import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageGallery from 'react-image-gallery';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
//import "react-image-gallery/styles/scss/image-gallery.scss";
import axios from 'axios';
import { connect } from 'react-redux';
import { Height } from '@material-ui/icons';

// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//   },
// ];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,
  },
});

function PlacardGallery(props) {
  const classes = useStyles();

  const userToken = props.token;
  const userId = props.user;
  const listing = props.listing;
  const images = [
    {
      original: `${props.images}`,
    },
  ];
  console.log(images);

  const addToFav = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/profiles/fav/${listing}/`,
        {
          user: userId,
        },
        {
          headers: {
            Authorization: `Token ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [props]);

  function renderCustom() {
    return (
      <IconButton className={classes.favoriteIcon} aria-label="delete">
        <FavoriteBorderIcon
          fontSize="default"
          color="primary"
          onClick={addToFav}
        />
      </IconButton>
    );
  }

  return (
    <ImageGallery
      styles={{ zIndex: 10 }}
      items={images}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showIndex={false}
      renderCustomControls={renderCustom}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
    userId: state.userId,
    token: state.token,
  };
};

export default connect(mapStateToProps, null)(PlacardGallery);
